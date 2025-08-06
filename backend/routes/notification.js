import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  message: String,
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  noteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Notes', required: true },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  subject: { type: String, required: true }
});

// ✅ Check if already compiled
export default mongoose.models.Notification || mongoose.model('Notification', notificationSchema);
