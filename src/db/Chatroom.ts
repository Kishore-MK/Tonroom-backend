import mongoose from 'mongoose';

const chatRoomsSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
    },
    topic: {
      type: String,
      required: true,
    },
    creatorRole: {
      type: String,
      required: true,
    },
    participantRole: {
      type: String,
      required: true,
    },
    creator: {
      type: String,
      required: true,
    },
    participant: {
      type: String,
      required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        index: { expires: '120m' }, 
      },
  },
  { timestamps: false } 
);

const ChatRooms = mongoose.model('ChatRooms', chatRoomsSchema);

export const getChatRooms= () => ChatRooms.find();

export const getChatRoom= (id:string) => ChatRooms.findOne({id});

export const createChatRoom =(values:Record<string,any>)=> new ChatRooms(values).save().then((request:any)=>request.toObject());

export const deleteChatRoomById=(id:string)=>ChatRooms.findOneAndDelete({_id:id})

export const updateChatRoomById = (id: string, values: Record<string, any>) => {
   ChatRooms.findByIdAndUpdate(
    id,
    { $set: values }, 
    { new: true }
  )
    .then((updatedChatRoom: any) => updatedChatRoom?.toObject())
    .catch((error: any) => {
      console.error("Error updating ChatRoom:", error);
      throw error;
    });
};
