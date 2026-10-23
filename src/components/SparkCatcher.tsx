"use client";

import { useEffect, useRef, useState } from "react";

const BEST_KEY = "geerams-clean-sweep-best";

export default function SparkCatcher() {
  const mount = useRef<HTMLDivElement>(null);
  const [best, setBest] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try { setBest(Number(localStorage.getItem(BEST_KEY)) || 0); } catch {}
    let game: import("phaser").Game | undefined;
    let cancelled = false;

    void import("phaser").then((Phaser) => {
      if (cancelled || !mount.current) return;

      class CleanSweepScene extends Phaser.Scene {
        playerX = 0;
        playerY = 0;
        score = 0;
        lives = 3;
        running = false;
        spawnIn = 500;
        elapsed = 0;
        items: { x: number; y: number; speed: number; grime: boolean; size: number; phase: number }[] = [];
        art!: Phaser.GameObjects.Graphics;
        hud!: Phaser.GameObjects.Text;
        livesHud!: Phaser.GameObjects.Text;
        overlay!: Phaser.GameObjects.Container;
        overlayTitle!: Phaser.GameObjects.Text;
        overlayBody!: Phaser.GameObjects.Text;
        cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
        keys!: { a: Phaser.Input.Keyboard.Key; d: Phaser.Input.Keyboard.Key };

        constructor() { super("CleanSweepScene"); }

        create() {
          this.playerX = this.scale.width / 2;
          this.playerY = this.scale.height - 58;
          this.art = this.add.graphics().setDepth(1);
          this.hud = this.add.text(18, 15, "SCORE  0", {
            fontFamily: "Arial, sans-serif", fontSize: "13px", fontStyle: "bold", color: "#ffffff",
            letterSpacing: 1
          }).setDepth(4);
          this.livesHud = this.add.text(this.scale.width - 18, 15, "♥  ♥  ♥", {
            fontFamily: "Arial, sans-serif", fontSize: "14px", fontStyle: "bold", color: "#7be7ff"
          }).setOrigin(1, 0).setDepth(4);
          this.cursors = this.input.keyboard!.createCursorKeys();
          this.keys = { a: this.input.keyboard!.addKey("A"), d: this.input.keyboard!.addKey("D") };

          const shade = this.add.rectangle(this.scale.width / 2, this.scale.height / 2, this.scale.width, this.scale.height, 0x07172f, 0.78);
          const panel = this.add.rectangle(this.scale.width / 2, this.scale.height / 2, Math.min(390, this.scale.width - 28), 178, 0x102b4b, 0.97)
            .setStrokeStyle(1, 0x42c9ec, 0.7);
          this.overlayTitle = this.add.text(this.scale.width / 2, this.scale.height / 2 - 48, "GEERAMS CLEAN SWEEP", {
            fontFamily: "Arial, sans-serif", fontSize: "18px", fontStyle: "bold", color: "#ffffff",
            align: "center", letterSpacing: 1, wordWrap: { width: this.scale.width - 54 }
          }).setOrigin(0.5);
          this.overlayBody = this.add.text(this.scale.width / 2, this.scale.height / 2 + 13,
            "Catch blue clean drops. Dodge the grime.\n\nTAP TO START", {
              fontFamily: "Arial, sans-serif", fontSize: "13px", color: "#c8e7f5",
              align: "center", lineSpacing: 5, wordWrap: { width: this.scale.width - 60 }
            }).setOrigin(0.5);
          this.overlay = this.add.container(0, 0, [shade, panel, this.overlayTitle, this.overlayBody]).setDepth(10);

          this.input.on("pointerdown", (p: Phaser.Input.Pointer) => {
            if (!this.running) { this.start(); return; }
            this.playerX = Phaser.Math.Clamp(p.x, 34, this.scale.width - 34);
          });
          this.input.on("pointermove", (p: Phaser.Input.Pointer) => {
            if (this.running && p.isDown) this.playerX = Phaser.Math.Clamp(p.x, 34, this.scale.width - 34);
          });
          this.scale.on("resize", (size: Phaser.Structs.Size) => {
            this.playerY = size.height - 58;
            this.livesHud.setPosition(size.width - 18, 15);
            const children = this.overlay.getAll();
            (children[0] as Phaser.GameObjects.Rectangle).setPosition(size.width / 2, size.height / 2).setSize(size.width, size.height);
            (children[1] as Phaser.GameObjects.Rectangle).setPosition(size.width / 2, size.height / 2).setSize(Math.min(390, size.width - 28), 178);
            this.overlayTitle.setPosition(size.width / 2, size.height / 2 - 48).setWordWrapWidth(size.width - 54);
            this.overlayBody.setPosition(size.width / 2, size.height / 2 + 13).setWordWrapWidth(size.width - 60);
          });
          this.paint();
        }

        start() {
          this.score = 0; this.lives = 3; this.elapsed = 0; this.spawnIn = 450;
          this.items = []; this.running = true; this.overlay.setVisible(false);
          this.hud.setText("SCORE  0"); this.livesHud.setText("♥  ♥  ♥");
        }

        update(_time: number, delta: number) {
          if (!this.running) { this.paint(); return; }
          const dt = Math.min(delta, 40);
          this.elapsed += dt;
          const speedFactor = 1 + Math.min(this.elapsed / 55000, 1.25);
          const direction = (this.cursors.left.isDown || this.keys.a.isDown ? -1 : 0) +
            (this.cursors.right.isDown || this.keys.d.isDown ? 1 : 0);
          this.playerX = Phaser.Math.Clamp(this.playerX + direction * dt * 0.42, 34, this.scale.width - 34);
          this.spawnIn -= dt;

          if (this.spawnIn <= 0) {
            const grime = Math.random() < Math.min(0.3 + this.elapsed / 180000, 0.43);
            this.items.push({
              x: Phaser.Math.Between(18, Math.max(19, this.scale.width - 18)),
              y: -18, speed: Phaser.Math.Between(105, 165) * speedFactor,
              grime, size: grime ? Phaser.Math.Between(11, 16) : Phaser.Math.Between(7, 11),
              phase: Math.random() * Math.PI * 2
            });
            this.spawnIn = Math.max(240, Phaser.Math.Between(420, 700) - this.elapsed / 220);
          }

          for (let i = this.items.length - 1; i >= 0; i--) {
            const item = this.items[i];
            item.y += item.speed * dt / 1000;
            item.phase += dt / 350;
            if (item.y > this.playerY - 12 && item.y < this.playerY + 20 &&
              Math.abs(item.x - this.playerX) < item.size + 25) {
              this.items.splice(i, 1);
              if (item.grime) {
                this.lives--;
                this.livesHud.setText(this.lives > 0 ? Array(this.lives).fill("♥").join("  ") : "—");
                if (this.lives <= 0) this.finish();
              } else {
                this.score += 10;
                this.hud.setText("SCORE  " + this.score);
              }
            } else if (item.y > this.scale.height + 24) {
              this.items.splice(i, 1);
            }
          }
          this.paint();
        }

        finish() {
          this.running = false;
          let old = 0;
          try { old = Number(localStorage.getItem(BEST_KEY)) || 0; } catch {}
          const next = Math.max(old, this.score);
          if (next > old) {
            try { localStorage.setItem(BEST_KEY, String(next)); } catch {}
            this.game.events.emit("best", next);
          }
          this.overlayTitle.setText("SHIFT COMPLETE");
          this.overlayBody.setText("SCORE  " + this.score + "     BEST  " + next + "\n\nTAP TO PLAY AGAIN");
          this.overlay.setVisible(true);
        }

        paint() {
          const w = this.scale.width, h = this.scale.height;
          this.art.clear();
          this.art.fillGradientStyle(0x07172f, 0x0b2343, 0x102e4a, 0x0b1e38, 1);
          this.art.fillRect(0, 0, w, h);
          this.art.fillStyle(0x1c5577, 0.16);
          for (let x = 18; x < w; x += 36) this.art.fillRect(x, 0, 1, h);
          for (let y = 28; y < h; y += 36) this.art.fillRect(0, y, w, 1);
          this.art.lineStyle(1, 0x43c9eb, 0.18);
          this.art.lineBetween(0, h - 34, w, h - 34);
          for (let i = 0; i < 6; i++) {
            const bx = (i * 91 + 34) % Math.max(w, 1);
            const by = (i * 57 + 38) % Math.max(h - 70, 1);
            this.art.fillStyle(0x65dff4, 0.08);
            this.art.fillCircle(bx, by, 12 + (i % 3) * 5);
          }

          for (const item of this.items) {
            if (item.grime) {
              this.art.fillStyle(0x402d36, 0.34);
              this.art.fillCircle(item.x, item.y + 2, item.size + 6);
              this.art.fillStyle(0x73505a, 1);
              this.art.fillCircle(item.x, item.y, item.size);
              this.art.fillStyle(0xa77877, 1);
              this.art.fillCircle(item.x - item.size * 0.28, item.y - item.size * 0.25, item.size * 0.28);
              this.art.fillStyle(0x2a202a, 1);
              this.art.fillCircle(item.x - 4, item.y - 1, 1.8);
              this.art.fillCircle(item.x + 4, item.y - 1, 1.8);
              this.art.lineStyle(1.5, 0x2a202a, 1);
              this.art.lineBetween(item.x - 3, item.y + 4, item.x + 3, item.y + 4);
            } else {
              const pulse = 1 + Math.sin(item.phase) * 0.08;
              this.art.fillStyle(0x28bfe8, 0.12);
              this.art.fillCircle(item.x, item.y, item.size * 2.1 * pulse);
              this.art.fillStyle(0x48d7f4, 0.85);
              this.art.fillCircle(item.x, item.y, item.size * pulse);
              this.art.fillStyle(0xe0fbff, 0.95);
              this.art.fillCircle(item.x - item.size * 0.25, item.y - item.size * 0.3, item.size * 0.27);
            }
          }

          // A little cleaning caddy with two bottles and a bright sponge.
          this.art.fillStyle(0x020b1a, 0.35);
          this.art.fillRoundedRect(this.playerX - 31, this.playerY - 19, 62, 43, 10);
          this.art.fillStyle(0x147aa3, 1);
          this.art.fillRoundedRect(this.playerX - 29, this.playerY - 23, 58, 40, 9);
          this.art.fillStyle(0x35c6e9, 1);
          this.art.fillRoundedRect(this.playerX - 25, this.playerY - 19, 50, 7, 4);
          this.art.fillStyle(0xf4fbff, 1);
          this.art.fillRoundedRect(this.playerX - 19, this.playerY - 13, 15, 24, 4);
          this.art.fillStyle(0x1b91c1, 1);
          this.art.fillRoundedRect(this.playerX - 16, this.playerY - 8, 9, 8, 2);
          this.art.fillStyle(0xf4fbff, 1);
          this.art.fillRoundedRect(this.playerX + 5, this.playerY - 10, 14, 21, 4);
          this.art.fillStyle(0x42c8e8, 1);
          this.art.fillRoundedRect(this.playerX + 8, this.playerY - 6, 8, 7, 2);
          this.art.fillStyle(0xffd166, 1);
          this.art.fillRoundedRect(this.playerX - 8, this.playerY + 8, 17, 7, 3);
          this.art.fillStyle(0xffffff, 0.9);
          this.art.fillCircle(this.playerX, this.playerY + 25, 2);
          this.art.fillCircle(this.playerX - 20, this.playerY + 25, 2);
          this.art.fillCircle(this.playerX + 20, this.playerY + 25, 2);
          this.art.fillStyle(0x07172f, 0.9);
          this.art.fillRoundedRect(this.playerX - 14, this.playerY - 2, 28, 7, 2);
          this.art.fillStyle(0xffffff, 1);
          this.art.fillRoundedRect(this.playerX - 12, this.playerY, 24, 3, 1);
        }
      }

      game = new Phaser.Game({
        type: Phaser.CANVAS,
        parent: mount.current,
        width: 620,
        height: 330,
        backgroundColor: "#07172f",
        scale: { mode: Phaser.Scale.RESIZE, autoCenter: Phaser.Scale.CENTER_BOTH },
        render: { antialias: true, pixelArt: false },
        scene: CleanSweepScene,
        banner: false
      });
      game.events.on("best", (value: number) => setBest(value));
      setReady(true);
    }).catch(() => setReady(false));

    return () => { cancelled = true; game?.destroy(true); };
  }, []);

  return (
    <section className="af-spark-section" aria-labelledby="af-spark-title">
      <div className="af-spark-copy">
        <p className="af-eyebrow">A QUICK CLEANING BREAK</p>
        <h2 id="af-spark-title">Clean <em>Sweep.</em></h2>
        <p>Help Geerams keep the shift spotless. Catch the clean blue drops and dodge the grime.</p>
        <div className="af-spark-stats">
          <span>PERSONAL BEST <b>{best}</b></span>
          <span>+10 PER DROP</span>
          <span>3 LIVES</span>
        </div>
        <p className="af-spark-tip">Drag left or right on your phone, or use ← → on a keyboard. Your best score stays on this device.</p>
      </div>
      <div className="af-spark-game-wrap">
        <div className="af-spark-game" ref={mount} aria-label="Geerams Clean Sweep game area" />
        {!ready && <p className="af-spark-loading" role="status">Preparing your cleaning challenge…</p>}
      </div>
    </section>
  );
}
