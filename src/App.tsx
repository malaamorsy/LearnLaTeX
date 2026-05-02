import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { WorldMap } from "./routes/WorldMap";
import { LevelView } from "./routes/LevelView";
import { Sandbox } from "./routes/Sandbox";
import { Reference } from "./routes/Reference";
import "./styles/global.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WorldMap />} />
        <Route path="/level/:levelId" element={<LevelView />} />
        <Route path="/sandbox" element={<Sandbox />} />
        <Route path="/reference" element={<Reference />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
