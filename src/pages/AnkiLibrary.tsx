export default function AnkiLibrary() {
  const dummyDecks = [
    {
      id: "1",
      title: "JavaScript Fundamentals",
      cards: 48,
      uploaded: "Jan 12, 2025",
    },
    {
      id: "2",
      title: "React Hooks & Patterns",
      cards: 32,
      uploaded: "Feb 2, 2025",
    },
    {
      id: "3",
      title: "MongoDB + Mongoose",
      cards: 27,
      uploaded: "Feb 10, 2025",
    },
    {
      id: "4",
      title: "Data Structures (Interview Prep)",
      cards: 60,
      uploaded: "Feb 20, 2025",
    },
  ];

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-900 px-4 py-10 text-slate-100 flex justify-center items-start">
      <div className="max-w-2xl w-full bg-slate-800/80 border border-slate-700 rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold mb-4 text-orange-400">
          Anki Deck Library
        </h1>

        <p className="text-slate-300 mb-6">
          Upload, organize, and study custom flashcard decks.
        </p>

        <div className="space-y-4">
          {dummyDecks.map((deck) => (
            <div
              key={deck.id}
              className="bg-slate-900/70 border border-slate-700 rounded-xl p-4 hover:border-orange-500 transition"
            >
              <h2 className="text-lg font-semibold text-orange-300">
                {deck.title}
              </h2>

              <div className="flex justify-between text-sm text-slate-400 mt-2">
                <p>{deck.cards} cards</p>
                <p>uploaded {deck.uploaded}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-xl border border-slate-700 bg-slate-900/50 p-6 text-slate-400 text-sm">
          <p>Deck uploading features coming soon...</p>
        </div>
      </div>
    </div>
  );
}
