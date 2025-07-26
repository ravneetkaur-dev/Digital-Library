import Feedback from '../models/Feedback.js';
export const submitFeedback = async (req, res) => {
    try {
        const { userName, userEmail, content, rating } = req.body;
        if (!userName || !userEmail || !content || !rating) {
            return res.status(400).json({ message: 'All fields are required.' });
        }
        const newFeedback = new Feedback({
            userName,
            userEmail,
            content,
            rating
        });
        await newFeedback.save();
        return res.status(201).json({ message: 'Feedback submitted successfully.' });
    }
    catch (error) {
        console.error('Error submitting feedback:', error); 
        return res.status(500).json({ message: 'Internal server error.' });
    }}
    export const getAllFeedback = async (req, res) => {
    try {
        const feedbacks = await Feedback.find().sort({ createdAt: -1 });
        return res.status(200).json(feedbacks);
    } catch (error) {
        console.error('Error fetching feedback:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }

}
// export default {submitFeedback,getAllFeedback};