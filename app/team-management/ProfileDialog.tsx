import { FBPlayer, teamRosterDB, watchListDB } from "@/_api/firebase-api";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import { Edit, Save } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/Dialog";
import Button from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";

interface Props {
  player: FBPlayer;
  pos: 'team'|'watchlist'
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reloadPlayers: () => void;
}

const ProfileDialog: FC<Props> = ({ player, pos, open, onOpenChange, reloadPlayers }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPlayer, setEditedPlayer] = useState(player);

  useEffect(() => {
    setIsEditing(false)
    setEditedPlayer(player)
  }, [player, open]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try{
        if(pos==='team'){
            await teamRosterDB.update(editedPlayer)
        }else{
            await watchListDB.update(editedPlayer)
        }
        setIsEditing(false);
        reloadPlayers()
    }catch{
        console.error('Error updating player')
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedPlayer((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Player Profile</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2">
            <Image
              src="https://img.freepik.com/premium-photo/basketball-player-logo-single-color-vector_1177187-50594.jpg"
              alt={player.name}
              className="w-full rounded-lg"
              height={1000}
              width={1000}
            />
          </div>
          <div className="md:w-2/3 md:pl-6 mt-4 md:mt-0">
            <div className="flex justify-between items-center  mb-2">
              <h2 className="text-2xl font-bold">{player.name}</h2>
              {!isEditing ? (
                <Button onClick={handleEdit} variant="icon">
                  <Edit className="h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={handleSave} variant="icon">
                  <Save className="h-4 w-4" />
                </Button>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-semibold">Position</p>
                <p>{player.position}</p>
              </div>
              <div>
                <p className="font-semibold">Country</p>
                <p>{player.country}</p>
              </div>
              <div>
                <p className="font-semibold">Age</p>
                <p>{player.age}</p>
              </div>
              <div>
                <p className="font-semibold">Number</p>
                <p>{player.number}</p>
              </div>
              <div>
                <p className="font-semibold">Height</p>
                <p>N/A</p>
              </div>
              <div>
                <p className="font-semibold">Weight</p>
                <p>N/A</p>
              </div>
              <div>
                <p className="font-semibold">Salary</p>
                {isEditing ? (
                  <Input
                    name="salary"
                    value={editedPlayer.salary || ""}
                    onChange={handleInputChange}
                    placeholder="Enter salary"
                  />
                ) : (
                  <p>{editedPlayer.salary || "N/A"}</p>
                )}
              </div>
              <div>
                <p className="font-semibold">Contract</p>
                {isEditing ? (
                  <Input
                    name="contract"
                    value={editedPlayer.contract || ""}
                    onChange={handleInputChange}
                    placeholder="Enter contract details"
                  />
                ) : (
                  <p>{editedPlayer.contract || "N/A"}</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          {/* {isEditing && (
            <Button onClick={handleSave} className="mt-4">
              Save Changes
            </Button>
          )} */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDialog;
