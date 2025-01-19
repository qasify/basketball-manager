import { db } from "@/config/firebase";
import { Player } from "./basketball-api";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

const WATCHLIST_COLLECTION = "watchlist";
const TEAM_ROSTER_COLLECTION = "team";
const NOTE_COLLECTION = "note";

export interface FBPlayer extends Player {
  documentId: string;
}

export const watchListDB = {
  add: async (player: Player) => {
    const q = query(
      collection(db, WATCHLIST_COLLECTION),
      where("id", "==", player.id)
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.docs.length === 0) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { isInTeam, isInWatchlist, ...otherData } = player;
      await addDoc(collection(db, WATCHLIST_COLLECTION), otherData);
    }
  },
  getAll: async () => {
    const querySnapshot = await getDocs(collection(db, WATCHLIST_COLLECTION));
    return querySnapshot.docs.map(
      (doc) =>
        ({
          documentId: doc.id,
          ...doc.data(),
        } as FBPlayer)
    );
  },
  remove: async (documentId: string) => {
    const docRef = doc(db, WATCHLIST_COLLECTION, documentId);
    await deleteDoc(docRef);
  },
  update: async (player: FBPlayer) => {
    const docRef = doc(db, WATCHLIST_COLLECTION, player.documentId);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { isInTeam, isInWatchlist, documentId, ...otherData } = player;
    await updateDoc(docRef, {
      ...otherData,
    });
  },
};

export const teamRosterDB = {
  add: async (player: Player) => {
    const q = query(
      collection(db, TEAM_ROSTER_COLLECTION),
      where("id", "==", player.id)
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.docs.length === 0) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { isInTeam, isInWatchlist, ...otherData } = player;
      await addDoc(collection(db, TEAM_ROSTER_COLLECTION), otherData);
    }
  },
  getAll: async () => {
    const querySnapshot = await getDocs(collection(db, TEAM_ROSTER_COLLECTION));
    return querySnapshot.docs.map(
      (doc) =>
        ({
          documentId: doc.id,
          ...doc.data(),
        } as FBPlayer)
    );
  },
  remove: async (documentId: string) => {
    const docRef = doc(db, TEAM_ROSTER_COLLECTION, documentId);
    await deleteDoc(docRef);
  },
  update: async (player: FBPlayer) => {
    const docRef = doc(db, TEAM_ROSTER_COLLECTION, player.documentId);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { isInTeam, isInWatchlist, documentId, ...otherData } = player;
    await updateDoc(docRef, {
      ...otherData,
    });
  },
};

export const notesDB = {
  add: async (playerId: number, note: string) => {
    const q = query(
      collection(db, NOTE_COLLECTION),
      where("id", "==", playerId)
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.docs.length === 0) {
      await addDoc(collection(db, NOTE_COLLECTION), {
        id: playerId,
        note,
      });
    } else {
      const docRef = doc(db, NOTE_COLLECTION, querySnapshot.docs[0].id);
      await updateDoc(docRef, {
        note,
      });
    }
  },
  get: async (playerId: number) => {
    const q = query(
      collection(db, NOTE_COLLECTION),
      where("id", "==", playerId)
    );
    const querySnapshot = await getDocs(q); 
    if (querySnapshot.docs.length === 1) {
      return querySnapshot.docs[0].data().note;
    } else {
      return "";
    }
  },
};
