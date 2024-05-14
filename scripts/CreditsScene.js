class CreditsScene extends Phaser.Scene {
    constructor() {
        super({ key: 'CreditsScene' });
    }

    preload(){
        this.load.image('sky', 'assets/images/bg.png');
        this.load.image('vignette', 'assets/images/misc/vignette.jpg');
    }

    create() {
        const background = this.add.image(400, 300, 'sky').setDisplaySize(800, 600);
        const vignette = this.add.image(400, 300, 'vignette').setDisplaySize(800, 600);
        vignette.setAlpha(0.5);

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

        this.add.text(400, 100, 'All Assets Made by', {
            fontSize: '48px',
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
        }).setOrigin(0.5);

        this.add.text(400, 250, 'Katherine Q. Canama', {
            fontSize: '36px',
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
        }).setOrigin(0.5);

        this.add.text(400, 300, 'A223', {
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
        }).setOrigin(0.5);

        this.add.text(400, 350, 'Entertainment and Multimedia Computing', {
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
        }).setOrigin(0.5);
    }
}

export default CreditsScene;
