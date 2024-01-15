import { Bulletin } from '../bulletin';
import { Matiere } from '../matiere';
import { Note } from './notes.model';
import { TNote } from './notes.types';

const create = async (
  submittedNote: TNote,
  bulletin_id: number,
  matiere_id: number
) => {
  try {
    const note = await Note.create(submittedNote);
    note.setBulletin(bulletin_id);
    note.setMatiere(matiere_id);
    return note;
  } catch (error) {
    throw new Error('erreur lors de la creation du Bulletin!');
  }
};

const readOne = async (idNote: number) => {
  try {
    const foundedNote = await Note.findOne({
      where: { id: idNote },
      include: [Bulletin, Matiere],
    });
    return foundedNote;
  } catch (error) {
    throw new Error('erreur lors de la lecture du Bulletin!');
  }
};



const noteService = {
  create,
  readOne,
};

export { noteService };
