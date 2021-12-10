export interface SteamGame {
    game: GameInfo[],
    image: string;
    title: string;
    description: string;
    price: {
        current: number;
        lowest: number;
        highest: number;
    };
}
interface GameInfo{
    price: string;
}
