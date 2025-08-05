import mongoose from 'mongoose';
const { Schema } = mongoose;

const BookSchema = new Schema({
  title:      { type: String, required: true, trim: true },
  author:     { type: String, required: true, trim: true },
  subject:    { type: String, required: true, trim: true },
 year: { type: String, required: true, match: /^\d{4}$/ }
,
  fileUrl:    { type: String, required: true, trim: true },
  uploadedBy: { type: Schema.Types.ObjectId, ref: 'User', required: false},
  visibility: {
    type: String,
    enum: ["public", "faculty-only", "students"],
    default: "public"
  },
}, {
  timestamps: true // this adds createdAt and updatedAt automatically
});

// Optional: index for faster search
BookSchema.index({ title: 1, author: 1 });

const book= mongoose.model("Book", BookSchema);
export default book;
