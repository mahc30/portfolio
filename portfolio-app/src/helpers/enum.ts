import { Tetris } from '../components/play/sirteT/Sirtet';
import { Ailensweeper } from '../components/play/ailens/Ailensweeper';
import { ContactMe } from '../components/molecules/ContactMe/ContactMe';

export function getSpecialCard(title: string){
    switch (title) {
        case "Tetris":
            return Tetris
            break;
        case "Ailensweeper":
            return Ailensweeper;
        case "Contact":
            return ContactMe;
            break;
    }
}