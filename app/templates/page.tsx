"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, Save, X } from "lucide-react";
import toast from "react-hot-toast";

interface CustomTemplate {
  id: string;
  name: string;
  prompt: string;
  description: string;
  color: string;
}

const colors = [
  "bg-blue-500",
  "bg-purple-500",
  "bg-green-500",
  "bg-orange-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-red-500",
  "bg-teal-500",
];

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<CustomTemplate[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    prompt: "",
    description: "",
    color: colors[0],
  });

  useEffect(() => {
    // Load templates from localStorage
    const saved = localStorage.getItem("customTemplates");
    if (saved) {
      setTemplates(JSON.parse(saved));
    }
  }, []);

  const saveTemplates = (newTemplates: CustomTemplate[]) => {
    localStorage.setItem("customTemplates", JSON.stringify(newTemplates));
    setTemplates(newTemplates);
  };

  const handleCreate = () => {
    if (!formData.name || !formData.prompt) {
      toast.error("Name and prompt are required");
      return;
    }

    const newTemplate: CustomTemplate = {
      id: Date.now().toString(),
      ...formData,
    };

    saveTemplates([...templates, newTemplate]);
    toast.success("Template created!");
    resetForm();
  };

  const handleUpdate = () => {
    if (!editingId) return;

    const updated = templates.map((t) =>
      t.id === editingId ? { ...t, ...formData } : t
    );

    saveTemplates(updated);
    toast.success("Template updated!");
    resetForm();
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this template?")) {
      saveTemplates(templates.filter((t) => t.id !== id));
      toast.success("Template deleted!");
    }
  };

  const handleEdit = (template: CustomTemplate) => {
    setEditingId(template.id);
    setFormData({
      name: template.name,
      prompt: template.prompt,
      description: template.description,
      color: template.color,
    });
    setIsCreating(true);
  };

  const resetForm = () => {
    setFormData({ name: "", prompt: "", description: "", color: colors[0] });
    setIsCreating(false);
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Custom Templates
            </h1>
            <p className="text-gray-300">
              Create and manage your own transformation templates
            </p>
          </div>

          {!isCreating && (
            <button
              onClick={() => setIsCreating(true)}
              className="px-6 py-3 bg-white text-purple-600 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2 shadow-lg"
            >
              <Plus className="w-5 h-5" />
              New Template
            </button>
          )}
        </div>

        {/* Create/Edit Form */}
        {isCreating && (
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-8 border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                {editingId ? "Edit Template" : "Create New Template"}
              </h2>
              <button
                onClick={resetForm}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Template Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="e.g., Technical Documentation"
                  className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Description
                </label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Brief description of what this template does"
                  className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Transformation Prompt
                </label>
                <textarea
                  value={formData.prompt}
                  onChange={(e) =>
                    setFormData({ ...formData, prompt: e.target.value })
                  }
                  placeholder="Enter the instructions for OpenAI to transform text. Example: Transform this into a professional email with a formal tone."
                  rows={6}
                  className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50 resize-none"
                />
                <p className="text-sm text-gray-300 mt-2">
                  This prompt will be sent to OpenAI to transform your
                  transcribed text.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Color
                </label>
                <div className="flex gap-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setFormData({ ...formData, color })}
                      className={`w-10 h-10 rounded-lg ${color} ${
                        formData.color === color ? "ring-4 ring-white" : ""
                      } transition-all`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={editingId ? handleUpdate : handleCreate}
                  className="flex-1 px-6 py-3 bg-white text-purple-600 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 font-medium"
                >
                  <Save className="w-5 h-5" />
                  {editingId ? "Update Template" : "Create Template"}
                </button>
                <button
                  onClick={resetForm}
                  className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <div
              key={template.id}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:border-white/40 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 ${template.color} rounded-lg`}>
                  <div className="w-6 h-6 bg-white/30 rounded" />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(template)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-4 h-4 text-white" />
                  </button>
                  <button
                    onClick={() => handleDelete(template.id)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-white mb-2">
                {template.name}
              </h3>
              <p className="text-gray-300 text-sm mb-4">
                {template.description}
              </p>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-xs text-gray-400 mb-1">Prompt:</p>
                <p className="text-sm text-white line-clamp-3">
                  {template.prompt}
                </p>
              </div>
            </div>
          ))}

          {templates.length === 0 && !isCreating && (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-300 text-lg mb-4">
                No custom templates yet
              </p>
              <button
                onClick={() => setIsCreating(true)}
                className="px-6 py-3 bg-white text-purple-600 rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Create Your First Template
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
