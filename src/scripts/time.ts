export default class Time{
    static bestTime:number = 0; // The best time in number of seconds
    static startTime: number;

    constructor(scene:Phaser.Scene){
        Time.startTime = Math.floor(scene.time.now/1000);
    }
}