import mongoose from "mongoose";

const requestQueueSchema = new mongoose.Schema(
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
    paymentStatus: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: Date,
      default: Date.now,
      index: { expires: '5m' }, 
    },
  },
  { timestamps: false } 
);

export const RequestQueue = mongoose.model('RequestQueue', requestQueueSchema,"requestqueues");


export const getRequestQueues= () => RequestQueue.find();

export const getRequestQueue= (id:string) => RequestQueue.findOne({id});

export const createRequestQueue =(values:Record<string,any>)=> new RequestQueue(values).save().then((request:any)=>request.toObject());

export const deleteRequestQueueById=(id:string)=>RequestQueue.findOneAndDelete({_id:id})

export const updateRequestQueueById = (id: string, values: Record<string, any>) => {
  RequestQueue.findByIdAndUpdate(
   id,
   { $set: values }, 
   { new: true }
 )
   .then((updatedRequestQueue: any) => updatedRequestQueue?.toObject())
   .catch((error: any) => {
     console.error("Error updating RequestQueue:", error);
     throw error;
   });
};
