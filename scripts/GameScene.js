const colors = ['FF0000', '00FF00', '0000FF', 'FFFF00', '00FFFF', 'FF00FF'];
let currentColorIndex = 0;

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        this.load.image('sky', 'assets/images/bg.png');
        this.load.image('ground', 'assets/images/plat.png');
        this.load.image('ground1', 'assets/images/platform.png');
        this.load.image('star', 'assets/images/Egg_item.png');
        this.load.image('bomb', 'assets/images/bomb.png');
        this.load.spritesheet('dude', 'assets/images/dude.png', { frameWidth: 32, frameHeight: 48 });
        
    }

    create() {
        
        this.player = null;
        this.stars = null;
        this.bombs = null;
        this.platforms = null;
        this.cursors = null;
        this.score = 0;
        this.gameOver = false;
        this.scoreText = null;

        this.add.image(400, 300, 'sky');
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 568, 'ground1');
        this.platforms.create(600, 400, 'ground');
        this.platforms.create(50, 250, 'ground');
        this.platforms.create(750, 220, 'ground');
        this.player = this.physics.add.sprite(100, 450, 'dude');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
        this.cursors = this.input.keyboard.createCursorKeys();
        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 4,
            setXY: {
                x: Phaser.Math.Between(100, 500),
                y: Phaser.Math.Between(100, 500),
                stepX: Phaser.Math.Between(50, 100)
            }
        });
        this.stars.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });
        this.bombs = this.physics.add.group();
        this.time.addEvent({
            delay: 15000,
            callback: this.spawnBomb,
            callbackScope: this,
            loop: true
        });
        this.scoreText = this.add.text(784, 16, 'Shells Collected: 0', { 
            fontSize: '32px', 
            fill: '#FFC0CB', 
            fontFamily: 'Butter', 
            shadow: {
                offsetX: 2,
                offsetY: 2,
                color: '#000',
                blur: 1,
                stroke: false,
                fill: true
            }
        }).setOrigin(1, 0);
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.collider(this.bombs, this.platforms);
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
        this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);
        
        const backButton = this.add.text(20, 20, 'Back', {
            fontSize: '24px',
            fontFamily: 'Butter',
            fill: '#ffffff',
            shadow: {
                offsetX: 2,
                offsetY: 2,
                color: '#000000',
                blur: 4,
                stroke: false,
                fill: true
            }
        }).setInteractive();

        backButton.on('pointerup', () => {
            this.scene.start('MainMenuScene'); 
        });
    }

    update() {
        if (this.gameOver) {
            return;
        }
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play('right', true);
        }
        else {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }
        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
        }

        
    }

    collectStar(player, star) {
        star.disableBody(true, true);
        player.setTint(parseInt(colors[currentColorIndex], 16));
        currentColorIndex = (currentColorIndex + 1) % colors.length;
        this.score += 1;
        this.scoreText.setText('Shells Collected: ' + this.score);
        this.scoreText.setFontFamily('Butter');
        
        if (this.score >= 5 && this.score % 5 === 0) {
            this.player.setScale(this.player.scaleX * 1.1, this.player.scaleY * 1.1);
        }
        var x = Phaser.Math.Between(0, 800);
        var y = Phaser.Math.Between(0, 200);
        var newStar = this.stars.create(x, y, 'star');
        newStar.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        if (this.stars.countActive(true) === 0) {
            this.stars.children.iterate(function (child) {
                child.enableBody(true, child.x, 0, true, true);
            });
        }
    }

    spawnBomb() {
        var x = Phaser.Math.Between(0, 800);
        var y = 1;
        var bomb = this.bombs.create(x, y, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        bomb.allowGravity = false;
    }

    hitBomb(player, bomb) {
        this.physics.pause();
        this.player.setTint(0xff0000);
        this.player.anims.play('turn');
        this.gameOver = true;
        this.add.text(400, 300, 'Game Over', { 
            fontSize: '48px', 
            fill: '#FF0000', 
            fontFamily: 'Butter', 
            shadow: {
                offsetX: 2,
                offsetY: 2,
                color: '#000',
                blur: 1,
                stroke: false,
                fill: true
            }
        }).setOrigin(0.5);
        this.player.setVisible(false);

    const restartButton = this.add.text(400, 350, 'Restart', {fontSize: '32px', fill: '#FFF', fontFamily: 'Butter', 
                                                                shadow: {
                                                                offsetX: 2,
                                                                offsetY: 2,
                                                                color: '#000',
                                                                blur: 1,
                                                                stroke: false,
                                                                fill: true
                                                            } }).setOrigin(0.5);
    const mainMenuButton = this.add.text(400, 400, 'Main Menu', { fontSize: '32px', fill: '#FFF', fontFamily: 'Butter',                                                     
                                                                shadow: {
                                                                offsetX: 2,
                                                                offsetY: 2,
                                                                color: '#000',
                                                                blur: 1,
                                                                stroke: false,
                                                                fill: true
                                                                } }).setOrigin(0.5);

    restartButton.setInteractive();
    restartButton.on('pointerdown', () => {
        this.scene.restart(); 
    });

    mainMenuButton.setInteractive();
    mainMenuButton.on('pointerdown', () => {
        this.scene.start('MainMenuScene'); 
    });
    }
}

export default GameScene;
