/Shareable Link - Available for both modes/,/)} *$/ {
  /mt-4/ s/mt-4/mt-3/
  /bg-gray-50 rounded-lg p-3 border border-gray-200/ {
    N
    s/<div className="bg-gray-50 rounded-lg p-3 border border-gray-200">\n *<div className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2 border border-gray-200">/<div className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2 border border-gray-200">/
  }
  /className="px-2 py-1 bg-white/ {
    N
    s/className="px-2 py-1 bg-white hover:bg-gray-100 rounded text-xs font-medium transition-colors"\n *>/onClick={() => navigator.clipboard.writeText(shareableLink)}\n                    className="px-2 py-1 bg-white hover:bg-gray-100 rounded text-xs font-medium transition-colors"\n                  >/
  }
  /<\/div>\n *<\/div>\n *<\/div>/ {
    s/<\/div>\n *<\/div>\n *<\/div>/<\/div>/
  }
}
