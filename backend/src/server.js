import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import multer from "multer";
import xlsx from "xlsx";
import { createClient } from "@supabase/supabase-js";
import { authRequired } from "./authMiddleware.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);
const SECRET = process.env.JWT_SECRET || "anemone-secret";
const upload = multer({ storage: multer.memoryStorage() });

// Auth
app.post("/auth/login", async (req, res) => {
  const { username, password } = req.body;

  const { data: admin, error } = await supabase
    .from("admins")
    .select("*")
    .eq("username", username)
    .single();

  if (error || !admin) return res.status(401).json({ error: "User not found" });

  const ok = await bcrypt.compare(password, admin.password || "");
  if (!ok) return res.status(401).json({ error: "Wrong password" });

  const token = jwt.sign({ id: admin.id, username }, SECRET, {
    expiresIn: "7d",
  });

  res.json({ token });
});

// Consultings list with search
app.get("/consultings", authRequired, async (req, res) => {
  const { q } = req.query;
  let query = supabase
    .from("consultings")
    .select("*")
    .order("created_at", { ascending: false });

  if (q) {
    query = query.or(
      `customer_name.ilike.%${q}%,phone.ilike.%${q}%,address.ilike.%${q}%`
    );
  }

  const { data, error } = await query;
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Create consulting
app.post("/consultings", authRequired, async (req, res) => {
  const { data, error } = await supabase
    .from("consultings")
    .insert(req.body)
    .select();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data[0]);
});

// Get consulting detail
app.get("/consultings/:id", authRequired, async (req, res) => {
  const { data, error } = await supabase
    .from("consultings")
    .select("*")
    .eq("id", req.params.id)
    .single();

  if (error || !data) return res.status(404).json({ error: "Not found" });
  res.json(data);
});

// Update consulting
app.put("/consultings/:id", authRequired, async (req, res) => {
  const { data, error } = await supabase
    .from("consultings")
    .update({ ...req.body, updated_at: new Date().toISOString() })
    .eq("id", req.params.id)
    .select();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data[0]);
});

// Delete consulting
app.delete("/consultings/:id", authRequired, async (req, res) => {
  const { error } = await supabase
    .from("consultings")
    .delete()
    .eq("id", req.params.id);

  if (error) return res.status(500).json({ error: error.message });
  res.json({ ok: true });
});

// Options
app.get("/options", authRequired, async (req, res) => {
  const { data, error } = await supabase
    .from("options")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.post("/options", authRequired, async (req, res) => {
  const { data, error } = await supabase
    .from("options")
    .insert(req.body)
    .select();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data[0]);
});

app.delete("/options/:id", authRequired, async (req, res) => {
  const { error } = await supabase
    .from("options")
    .delete()
    .eq("id", req.params.id);

  if (error) return res.status(500).json({ error: error.message });
  res.json({ ok: true });
});

// Excel upload
app.post(
  "/excel/upload",
  authRequired,
  upload.single("file"),
  async (req, res) => {
    if (!req.file) return res.status(400).json({ error: "No file" });

    const workbook = xlsx.read(req.file.buffer);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = xlsx.utils.sheet_to_json(sheet);

    const { data, error } = await supabase
      .from("consultings")
      .insert(rows)
      .select();

    if (error) return res.status(500).json({ error: error.message });
    res.json({ total: rows.length, inserted: data.length });
  }
);

const port = process.env.PORT || 4000;
app.listen(port, () =>
  console.log(`Backend running on http://localhost:${port}`)
);
