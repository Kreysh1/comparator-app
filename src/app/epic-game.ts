export class EpicGame {
    id: string;
    image: string;
    title: string;
    description: string;
    price: {
        current: number;
        lowest: number;
        highest: number;
    };
}

// export interface EpicGame {
//     game: GameInfo[],
//     image: string;
//     title: string;
//     description: string;
//     price: {
//         current: number;
//         lowest: number;
//         highest: number;
//     };
// }
// interface GameInfo{
//     price: string;
// }