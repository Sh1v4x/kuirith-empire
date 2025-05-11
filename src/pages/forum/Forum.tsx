import { useState } from "react";
import { SortAsc, Filter, Clock, Image, Send, Tag } from "lucide-react";

const tags = ["Tous", "Général", "Aide", "Discussion", "Hors-sujet"];

interface Post {
  id: number;
  content: string;
  tag: string;
  mediaUrl?: string;
  mediaType?: "image" | "video";
  createdAt: number;
  user: {
    name: string;
    avatar: string;
  };
}

const formatTimeAgo = (timestamp: number): string => {
  const now = Date.now();
  const diff = now - timestamp;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (seconds < 60) return "à l'instant";
  if (minutes < 60) return `il y a ${minutes} min${minutes > 1 ? "s" : ""}`;
  if (hours < 24) return `il y a ${hours}h`;
  if (days < 30) return `il y a ${days} jour${days > 1 ? "s" : ""}`;
  if (months < 12) return `il y a ${months} mois`;
  return `il y a ${years} an${years > 1 ? "s" : ""}`;
};

export default function Forum() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState("");
  const [selectedTag, setSelectedTag] = useState("Général");
  const [sortAsc, setSortAsc] = useState(false);
  const [filterTag, setFilterTag] = useState("Tous");
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setMediaFile(file);
    setMediaPreview(URL.createObjectURL(file));
  };

  const handlePost = () => {
    if (!newPost.trim()) return;

    let mediaUrl = mediaPreview;
    let mediaType: "image" | "video" | undefined;

    if (mediaFile) {
      const type = mediaFile.type;
      if (type.startsWith("image/")) mediaType = "image";
      else if (type.startsWith("video/")) mediaType = "video";
    }

    const newEntry: Post = {
      id: Date.now(),
      content: newPost,
      tag: selectedTag,
      mediaUrl,
      mediaType,
      createdAt: Date.now(),
      user: {
        name: "Toi",
        avatar: "https://placehold.co/50x50",
      },
    };

    setPosts((prev) => [newEntry, ...prev]);
    setNewPost("");
    setMediaFile(null);
    setMediaPreview(null);
  };

  const filteredPosts = posts
    .filter((post) => filterTag === "Tous" || post.tag === filterTag)
    .sort((a, b) => (sortAsc ? a.id - b.id : b.id - a.id));

  return (
    <div className="min-h-screen px-4 sm:px-6 md:px-8">
      <div className="max-w-3xl mx-auto space-y-6 py-10 pb-40">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-primary-700">
            Forum de discussion
          </h1>
          <p className="text-secondary-600">
            Exprimez-vous et partagez avec la communauté
          </p>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg border border-purple-100">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-shrink-0">
              <img
                src="https://placehold.co/50x50"
                alt="Avatar"
                className="w-12 h-12 rounded-full object-cover shadow-md"
              />
            </div>
            <div className="flex-1">
              <textarea
                rows={3}
                placeholder="Exprime-toi..."
                className="w-full border border-purple-200 rounded-xl p-3 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
              />

              <div className="mt-3 flex flex-wrap gap-3 items-center">
                <div className="relative">
                  <select
                    className="appearance-none bg-white border border-purple-200 p-2 pl-9 pr-8 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={selectedTag}
                    onChange={(e) => setSelectedTag(e.target.value)}
                  >
                    {tags.slice(1).map((tag) => (
                      <option key={tag} value={tag}>
                        {tag}
                      </option>
                    ))}
                  </select>
                  <Tag className="absolute left-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-600" />
                </div>

                <label className="relative flex items-center bg-white border border-purple-200 p-2 rounded-xl cursor-pointer group hover:bg-purple-50">
                  <Image className="w-5 h-5 mr-2 text-purple-600" />
                  <span className="text-sm font-medium text-purple-700">
                    {mediaFile ? "Média ajouté" : "Ajouter média"}
                  </span>
                  <input
                    type="file"
                    accept="image/*,video/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleMediaChange}
                  />
                </label>

                <button
                  onClick={handlePost}
                  className="ml-auto flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-2 rounded-xl hover:shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>Publier</span>
                </button>
              </div>

              {mediaPreview && (
                <div className="mt-3 relative">
                  <div className="overflow-hidden rounded-xl border border-purple-200">
                    {mediaFile?.type.startsWith("image/") ? (
                      <img
                        src={mediaPreview}
                        alt="Aperçu"
                        className="max-h-40 w-full object-cover"
                      />
                    ) : (
                      <video
                        src={mediaPreview}
                        controls
                        className="max-h-40 w-full"
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-purple-100">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-teal-600" />
            <span className="text-purple-700 font-medium">
              {filteredPosts.length} post{filteredPosts.length !== 1 && "s"}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 text-sm">
            <div className="relative">
              <select
                className="appearance-none bg-white border border-purple-200 py-2 pl-8 pr-6 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={filterTag}
                onChange={(e) => setFilterTag(e.target.value)}
              >
                {tags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
              <Filter className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-teal-600" />
            </div>

            <button
              onClick={() => setSortAsc((prev) => !prev)}
              className="flex items-center gap-1 bg-white border border-purple-200 py-2 px-3 rounded-xl text-purple-700 hover:bg-purple-50"
            >
              <SortAsc className="w-4 h-4" />
              <span>{sortAsc ? "Ancien → Récent" : "Récent → Ancien"}</span>
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white p-5 rounded-2xl shadow-md border border-purple-100 hover:shadow-lg"
            >
              <div className="flex gap-3">
                <img
                  src={post.user.avatar}
                  alt={post.user.name}
                  className="w-10 h-10 rounded-full object-cover shadow-sm"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-purple-800">
                      {post.user.name}
                    </span>
                    <div className="flex items-center text-xs text-purple-500">
                      <Clock className="w-3 h-3 mr-1" />
                      <span>{formatTimeAgo(post.createdAt)}</span>
                    </div>
                  </div>
                  <p className="mt-1 text-gray-700 leading-relaxed">
                    {post.content}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium">
                      {post.tag}
                    </span>
                  </div>
                  {post.mediaUrl && (
                    <div className="mt-3">
                      <div className="overflow-hidden rounded-xl border border-purple-100">
                        {post.mediaType === "image" ? (
                          <img
                            src={post.mediaUrl}
                            alt="Media"
                            className="max-h-60 w-full object-cover"
                          />
                        ) : (
                          <video
                            src={post.mediaUrl}
                            controls
                            className="max-h-60 w-full"
                          />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
