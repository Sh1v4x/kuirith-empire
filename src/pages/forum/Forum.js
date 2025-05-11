import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { SortAsc, Filter, Clock, Image, Send, Tag } from "lucide-react";
const tags = ["Tous", "Général", "Aide", "Discussion", "Hors-sujet"];
const formatTimeAgo = (timestamp) => {
    const now = Date.now();
    const diff = now - timestamp;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);
    if (seconds < 60)
        return "à l'instant";
    if (minutes < 60)
        return `il y a ${minutes} min${minutes > 1 ? "s" : ""}`;
    if (hours < 24)
        return `il y a ${hours}h`;
    if (days < 30)
        return `il y a ${days} jour${days > 1 ? "s" : ""}`;
    if (months < 12)
        return `il y a ${months} mois`;
    return `il y a ${years} an${years > 1 ? "s" : ""}`;
};
export default function Forum() {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState("");
    const [selectedTag, setSelectedTag] = useState("Général");
    const [sortAsc, setSortAsc] = useState(false);
    const [filterTag, setFilterTag] = useState("Tous");
    const [mediaFile, setMediaFile] = useState(null);
    const [mediaPreview, setMediaPreview] = useState(null);
    const handleMediaChange = (e) => {
        const file = e.target.files?.[0];
        if (!file)
            return;
        setMediaFile(file);
        setMediaPreview(URL.createObjectURL(file));
    };
    const handlePost = () => {
        if (!newPost.trim())
            return;
        let mediaType;
        if (mediaFile) {
            const type = mediaFile.type;
            if (type.startsWith("image/"))
                mediaType = "image";
            else if (type.startsWith("video/"))
                mediaType = "video";
        }
        const newEntry = {
            id: Date.now(),
            content: newPost,
            tag: selectedTag,
            mediaUrl: mediaPreview || undefined,
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
    return (_jsx("div", { className: "min-h-screen px-4 sm:px-6 md:px-8", children: _jsxs("div", { className: "max-w-3xl mx-auto space-y-6 py-10 pb-40", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsx("h1", { className: "text-2xl sm:text-3xl font-bold text-primary-700", children: "Forum de discussion" }), _jsx("p", { className: "text-secondary-600", children: "Exprimez-vous et partagez avec la communaut\u00E9" })] }), _jsx("div", { className: "bg-white p-4 sm:p-6 rounded-2xl shadow-lg border border-purple-100", children: _jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [_jsx("div", { className: "flex-shrink-0", children: _jsx("img", { src: "https://placehold.co/50x50", alt: "Avatar", className: "w-12 h-12 rounded-full object-cover shadow-md" }) }), _jsxs("div", { className: "flex-1", children: [_jsx("textarea", { rows: 3, placeholder: "Exprime-toi...", className: "w-full border border-purple-200 rounded-xl p-3 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700", value: newPost, onChange: (e) => setNewPost(e.target.value) }), _jsxs("div", { className: "mt-3 flex flex-wrap gap-3 items-center", children: [_jsxs("div", { className: "relative", children: [_jsx("select", { className: "appearance-none bg-white border border-purple-200 p-2 pl-9 pr-8 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500", value: selectedTag, onChange: (e) => setSelectedTag(e.target.value), children: tags.slice(1).map((tag) => (_jsx("option", { value: tag, children: tag }, tag))) }), _jsx(Tag, { className: "absolute left-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-600" })] }), _jsxs("label", { className: "relative flex items-center bg-white border border-purple-200 p-2 rounded-xl cursor-pointer group hover:bg-purple-50", children: [_jsx(Image, { className: "w-5 h-5 mr-2 text-purple-600" }), _jsx("span", { className: "text-sm font-medium text-purple-700", children: mediaFile ? "Média ajouté" : "Ajouter média" }), _jsx("input", { type: "file", accept: "image/*,video/*", className: "absolute inset-0 opacity-0 cursor-pointer", onChange: handleMediaChange })] }), _jsxs("button", { onClick: handlePost, className: "ml-auto flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-2 rounded-xl hover:shadow-md", children: [_jsx(Send, { className: "w-4 h-4" }), _jsx("span", { children: "Publier" })] })] }), mediaPreview && (_jsx("div", { className: "mt-3 relative", children: _jsx("div", { className: "overflow-hidden rounded-xl border border-purple-200", children: mediaFile?.type.startsWith("image/") ? (_jsx("img", { src: mediaPreview, alt: "Aper\u00E7u", className: "max-h-40 w-full object-cover" })) : (_jsx("video", { src: mediaPreview, controls: true, className: "max-h-40 w-full" })) }) }))] })] }) }), _jsxs("div", { className: "bg-white p-4 rounded-xl shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-purple-100", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Clock, { className: "w-4 h-4 text-teal-600" }), _jsxs("span", { className: "text-purple-700 font-medium", children: [filteredPosts.length, " post", filteredPosts.length !== 1 && "s"] })] }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-2 text-sm", children: [_jsxs("div", { className: "relative", children: [_jsx("select", { className: "appearance-none bg-white border border-purple-200 py-2 pl-8 pr-6 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500", value: filterTag, onChange: (e) => setFilterTag(e.target.value), children: tags.map((tag) => (_jsx("option", { value: tag, children: tag }, tag))) }), _jsx(Filter, { className: "absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-teal-600" })] }), _jsxs("button", { onClick: () => setSortAsc((prev) => !prev), className: "flex items-center gap-1 bg-white border border-purple-200 py-2 px-3 rounded-xl text-purple-700 hover:bg-purple-50", children: [_jsx(SortAsc, { className: "w-4 h-4" }), _jsx("span", { children: sortAsc ? "Ancien → Récent" : "Récent → Ancien" })] })] })] }), _jsx("div", { className: "space-y-4", children: filteredPosts.map((post) => (_jsx("div", { className: "bg-white p-5 rounded-2xl shadow-md border border-purple-100 hover:shadow-lg", children: _jsxs("div", { className: "flex gap-3", children: [_jsx("img", { src: post.user.avatar, alt: post.user.name, className: "w-10 h-10 rounded-full object-cover shadow-sm" }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center justify-between mb-1", children: [_jsx("span", { className: "font-semibold text-purple-800", children: post.user.name }), _jsxs("div", { className: "flex items-center text-xs text-purple-500", children: [_jsx(Clock, { className: "w-3 h-3 mr-1" }), _jsx("span", { children: formatTimeAgo(post.createdAt) })] })] }), _jsx("p", { className: "mt-1 text-gray-700 leading-relaxed", children: post.content }), _jsx("div", { className: "flex items-center gap-2 mt-2", children: _jsx("span", { className: "text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium", children: post.tag }) }), post.mediaUrl && (_jsx("div", { className: "mt-3", children: _jsx("div", { className: "overflow-hidden rounded-xl border border-purple-100", children: post.mediaType === "image" ? (_jsx("img", { src: post.mediaUrl, alt: "Media", className: "max-h-60 w-full object-cover" })) : (_jsx("video", { src: post.mediaUrl, controls: true, className: "max-h-60 w-full" })) }) }))] })] }) }, post.id))) })] }) }));
}
