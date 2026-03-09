import { useEffect, useState } from "react"
import axios from "axios"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

type Photo = { url: string; caption: string }
type Video = { url: string; title: string }
type BioData = {
  name: string
  tagline: string
  bio: string[]
  photos: Photo[]
  videos: Video[]
}

// ── shared input style ───────────────────────────────────────────────────────

const input = {
  width: "100%",
  padding: "10px 14px",
  background: "#1a1a1a",
  border: "1px solid #2e2e2e",
  borderRadius: "14px",
  color: "#fff",
  fontSize: "14px",
  outline: "none",
  boxSizing: "border-box" as const,
}

const label = {
  display: "block" as const,
  color: "#888",
  fontSize: "12px",
  marginBottom: "6px",
  fontWeight: 500 as const,
}

const field = { marginBottom: "18px" }

// ── component ────────────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const [ready, setReady] = useState(false)
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)

  const [name, setName] = useState("")
  const [tagline, setTagline] = useState("")
  const [bio, setBio] = useState<string[]>([""])
  const [photos, setPhotos] = useState<Photo[]>([])
  const [videos, setVideos] = useState<Video[]>([])

  // Auth guard
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) { window.location.href = "/admin/login"; return }
    setReady(true)
    axios
      .get(`${API_URL}/api/bio`)
      .then((res) => {
        const d: BioData = res.data
        setName(d.name || "")
        setTagline(d.tagline || "")
        setBio(d.bio?.length ? d.bio : [""])
        setPhotos(d.photos || [])
        setVideos(d.videos || [])
      })
      .catch(() => {})
  }, [])

  const token = () => localStorage.getItem("token") || ""

  const save = async () => {
    setSaving(true)
    try {
      await axios.put(
        `${API_URL}/api/bio`,
        { name, tagline, bio, photos, videos },
        { headers: { Authorization: `Bearer ${token()}` } }
      )
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch {
      alert("Save failed — check your session and try again.")
    } finally {
      setSaving(false)
    }
  }

  const logout = () => { localStorage.removeItem("token"); window.location.href = "/admin/login" }

  // Array helpers
  const updateBio = (i: number, val: string) => setBio((p) => p.map((x, idx) => idx === i ? val : x))
  const addBio = () => setBio((p) => [...p, ""])
  const removeBio = (i: number) => setBio((p) => p.filter((_, idx) => idx !== i))

  const updatePhoto = (i: number, key: keyof Photo, val: string) =>
    setPhotos((p) => p.map((x, idx) => idx === i ? { ...x, [key]: val } : x))
  const addPhoto = () => setPhotos((p) => [...p, { url: "", caption: "" }])
  const removePhoto = (i: number) => setPhotos((p) => p.filter((_, idx) => idx !== i))

  const updateVideo = (i: number, key: keyof Video, val: string) =>
    setVideos((p) => p.map((x, idx) => idx === i ? { ...x, [key]: val } : x))
  const addVideo = () => setVideos((p) => [...p, { url: "", title: "" }])
  const removeVideo = (i: number) => setVideos((p) => p.filter((_, idx) => idx !== i))

  if (!ready) return null

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#fff" }}>
      {/* ── Top bar ── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 40px",
          background: "#000",
          borderBottom: "1px solid #1e1e1e",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <span style={{ color: "#ff2d95", fontWeight: 700, fontSize: "16px" }}>OSOS DISCOS · Admin</span>
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <a href="/" style={{ color: "#555", fontSize: "13px", textDecoration: "none" }}>
            ← View Site
          </a>
          <button
            onClick={logout}
            style={{
              background: "none",
              border: "1px solid #333",
              color: "#888",
              padding: "6px 16px",
              borderRadius: "18px",
              cursor: "pointer",
              fontSize: "13px",
            }}
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* ── Main ── */}
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "48px 40px" }}>
        <h2 style={{ color: "#ff2d95", fontSize: "24px", marginBottom: "4px" }}>Bio Editor</h2>
        <p style={{ color: "#555", fontSize: "13px", marginBottom: "40px" }}>
          Changes are saved to the database and appear live on the site immediately.
        </p>

        {/* Name + Tagline */}
        <div
          style={{
            background: "#111",
            border: "1px solid #1e1e1e",
            borderRadius: "18px",
            padding: "28px",
            marginBottom: "24px",
          }}
        >
          <h3 style={{ color: "#ccc", fontSize: "14px", marginBottom: "20px", textTransform: "uppercase", letterSpacing: "1px" }}>
            Identity
          </h3>
          <div style={field}>
            <label style={label}>Name</label>
            <input style={input} value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
          </div>
          <div style={{ ...field, marginBottom: 0 }}>
            <label style={label}>Tagline</label>
            <input style={input} value={tagline} onChange={(e) => setTagline(e.target.value)} placeholder="e.g. Festival DJ · Producer · Live Act" />
          </div>
        </div>

        {/* Bio paragraphs */}
        <div
          style={{
            background: "#111",
            border: "1px solid #1e1e1e",
            borderRadius: "18px",
            padding: "28px",
            marginBottom: "24px",
          }}
        >
          <h3 style={{ color: "#ccc", fontSize: "14px", marginBottom: "20px", textTransform: "uppercase", letterSpacing: "1px" }}>
            Bio
          </h3>
          {bio.map((para, i) => (
            <div key={i} style={{ marginBottom: "12px", display: "flex", gap: "8px" }}>
              <textarea
                style={{ ...input, minHeight: "80px", resize: "vertical", borderRadius: "14px", flex: 1 }}
                value={para}
                onChange={(e) => updateBio(i, e.target.value)}
                placeholder={`Paragraph ${i + 1}`}
              />
              {bio.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeBio(i)}
                  style={{ background: "none", border: "none", color: "#555", cursor: "pointer", fontSize: "18px", padding: "4px 8px" }}
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addBio}
            style={{
              marginTop: "8px",
              background: "none",
              border: "1px dashed #2e2e2e",
              color: "#555",
              padding: "8px 20px",
              borderRadius: "14px",
              cursor: "pointer",
              fontSize: "13px",
              width: "100%",
            }}
          >
            + Add Paragraph
          </button>
        </div>

        {/* Photos */}
        <div
          style={{
            background: "#111",
            border: "1px solid #1e1e1e",
            borderRadius: "18px",
            padding: "28px",
            marginBottom: "24px",
          }}
        >
          <h3 style={{ color: "#ccc", fontSize: "14px", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "1px" }}>
            Photos
          </h3>
          <p style={{ color: "#555", fontSize: "12px", marginBottom: "20px" }}>
            First photo is used as your profile image. Paste direct image URLs (Dropbox, Google Drive, CDN, etc.)
          </p>
          {photos.map((photo, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: "12px",
                marginBottom: "12px",
                alignItems: "flex-start",
                background: "#0a0a0a",
                border: "1px solid #1e1e1e",
                borderRadius: "14px",
                padding: "16px",
              }}
            >
              {photo.url && (
                <img
                  src={photo.url}
                  alt=""
                  style={{ width: "64px", height: "64px", objectFit: "cover", borderRadius: "10px", flexShrink: 0 }}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none" }}
                />
              )}
              <div style={{ flex: 1 }}>
                <input
                  style={{ ...input, marginBottom: "8px" }}
                  value={photo.url}
                  onChange={(e) => updatePhoto(i, "url", e.target.value)}
                  placeholder="Image URL"
                />
                <input
                  style={input}
                  value={photo.caption}
                  onChange={(e) => updatePhoto(i, "caption", e.target.value)}
                  placeholder="Caption (optional)"
                />
              </div>
              <button
                type="button"
                onClick={() => removePhoto(i)}
                style={{ background: "none", border: "none", color: "#555", cursor: "pointer", fontSize: "18px", padding: "4px" }}
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addPhoto}
            style={{
              background: "none",
              border: "1px dashed #2e2e2e",
              color: "#555",
              padding: "8px 20px",
              borderRadius: "14px",
              cursor: "pointer",
              fontSize: "13px",
              width: "100%",
            }}
          >
            + Add Photo
          </button>
        </div>

        {/* Videos */}
        <div
          style={{
            background: "#111",
            border: "1px solid #1e1e1e",
            borderRadius: "18px",
            padding: "28px",
            marginBottom: "40px",
          }}
        >
          <h3 style={{ color: "#ccc", fontSize: "14px", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "1px" }}>
            Videos
          </h3>
          <p style={{ color: "#555", fontSize: "12px", marginBottom: "20px" }}>
            YouTube links are embedded automatically. Other URLs appear as a linked title.
          </p>
          {videos.map((vid, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: "12px",
                marginBottom: "12px",
                alignItems: "flex-start",
                background: "#0a0a0a",
                border: "1px solid #1e1e1e",
                borderRadius: "14px",
                padding: "16px",
              }}
            >
              <div style={{ flex: 1 }}>
                <input
                  style={{ ...input, marginBottom: "8px" }}
                  value={vid.url}
                  onChange={(e) => updateVideo(i, "url", e.target.value)}
                  placeholder="YouTube or video URL"
                />
                <input
                  style={input}
                  value={vid.title}
                  onChange={(e) => updateVideo(i, "title", e.target.value)}
                  placeholder="Title (optional)"
                />
              </div>
              <button
                type="button"
                onClick={() => removeVideo(i)}
                style={{ background: "none", border: "none", color: "#555", cursor: "pointer", fontSize: "18px", padding: "4px" }}
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addVideo}
            style={{
              background: "none",
              border: "1px dashed #2e2e2e",
              color: "#555",
              padding: "8px 20px",
              borderRadius: "14px",
              cursor: "pointer",
              fontSize: "13px",
              width: "100%",
            }}
          >
            + Add Video
          </button>
        </div>

        {/* Save */}
        <button
          onClick={save}
          disabled={saving}
          style={{
            width: "100%",
            padding: "14px",
            background: saved ? "#1a3a1a" : saving ? "#333" : "#ff2d95",
            border: saved ? "1px solid #2d952d" : "none",
            borderRadius: "18px",
            color: saved ? "#2d952d" : "#fff",
            fontSize: "16px",
            fontWeight: 600,
            cursor: saving ? "not-allowed" : "pointer",
          }}
        >
          {saved ? "Saved!" : saving ? "Saving…" : "Save Changes"}
        </button>
      </div>
    </div>
  )
}
