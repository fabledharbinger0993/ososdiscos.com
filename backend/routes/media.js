import express from "express"
import Media from "../models/Media.js"
import { auth } from "../middleware/auth.js"

const router = express.Router()

// Get all movies
router.get("/movies", async (req, res) => {
  try {
    const movies = await Media.find({ type: "movie" }).sort({ order: 1 })
    res.json(movies)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

// Get all pictures
router.get("/pictures", async (req, res) => {
  try {
    const pictures = await Media.find({ type: "picture" }).sort({ order: 1 })
    res.json(pictures)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

// Get all events
router.get("/events", async (req, res) => {
  try {
    const events = await Media.find({ type: "event" }).sort({ date: 1 })
    res.json(events)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

// Add media (auth required)
router.post("/", auth, async (req, res) => {
  try {
    const media = new Media(req.body)
    await media.save()
    res.json(media)
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
})

// Update media
router.put("/:id", auth, async (req, res) => {
  try {
    const media = await Media.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(media)
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
})

// Delete media
router.delete("/:id", auth, async (req, res) => {
  try {
    await Media.findByIdAndDelete(req.params.id)
    res.json({ ok: true })
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
})

export default router
