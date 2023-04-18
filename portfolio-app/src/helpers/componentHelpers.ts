import { Tetris } from '../components/play/sirteT/Sirtet';
import { Ailensweeper } from '../components/play/ailens/Ailensweeper';
import { ContactMe } from '../components/molecules/ContactMe/ContactMe';
import { Socials } from '../components/molecules/Socials/Socials';

export function getSpecialCard(title: string){
    switch (title) {
        case "Tetris":
            return Tetris
        case "Ailensweeper":
            return Ailensweeper;
        case "Email":
            return ContactMe;
        case "Socials":
            return Socials;
    }
}