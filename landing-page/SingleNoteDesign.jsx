import { motion } from 'framer-motion'
import { 
  MapPin, 
  MessageSquare, 
  Palette, 
  Target, 
  Zap 
} from 'lucide-react'

// Standalone Single Note Design Component
const SingleSleekNote = ({ 
  content = "The button color doesn't match our brand guidelines. Could we use our primary blue (#2563eb) instead?",
  author = "Sarah Chen",
  avatar = "SC",
  timestamp = "2 min ago",
  tone = "professional",
  isAiEnhanced = true,
  delay = 0 
}) => (
  <motion.div
    className="inline-block z-20"
    initial={{ opacity: 0, scale: 0.8, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
  >
    {/* Connection Line */}
    <div className="absolute -bottom-2 left-6 w-0.5 h-8 bg-gradient-to-b from-gray-400 to-transparent"></div>
    
    {/* Main Note Container */}
    <div className="bg-white rounded-2xl shadow-2xl border border-gray-200/50 backdrop-blur-xl max-w-80 overflow-hidden relative">
      {/* Note Header */}
      <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center text-white text-sm font-semibold shadow-sm">
              {avatar}
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-900">{author}</div>
              <div className="text-xs text-gray-500">{timestamp}</div>
            </div>
          </div>
          
          {/* Status Indicator */}
          <div className="flex items-center space-x-2">
            {isAiEnhanced && (
              <div className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full flex items-center space-x-1">
                <Zap className="h-3 w-3" />
                <span>AI</span>
              </div>
            )}
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
      
      {/* Note Content */}
      <div className="p-4">
        <p className="text-gray-800 text-sm leading-relaxed mb-4">
          {content}
        </p>
        
        {/* AI Enhancement Options */}
        {isAiEnhanced && (
          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-between text-xs text-gray-600">
              <span>Tone: {tone}</span>
              <button className="text-gray-700 hover:text-gray-900 font-medium">Adjust</button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <button className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs rounded-full transition-colors flex items-center space-x-1">
                <Palette className="h-3 w-3" />
                <span>Rephrase</span>
              </button>
              <button className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs rounded-full transition-colors flex items-center space-x-1">
                <MessageSquare className="h-3 w-3" />
                <span>Complete</span>
              </button>
            </div>
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-3">
            <button className="text-gray-400 hover:text-gray-600 transition-colors">
              <MessageSquare className="h-4 w-4" />
            </button>
            <button className="text-gray-400 hover:text-red-500 transition-colors">
              <Target className="h-4 w-4" />
            </button>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1.5 text-gray-600 hover:text-gray-800 text-xs font-medium transition-colors">
              Reply
            </button>
            <button className="px-3 py-1.5 bg-gray-900 hover:bg-black text-white text-xs font-medium rounded-lg transition-colors">
              Resolve
            </button>
          </div>
        </div>
      </div>
      
      {/* Floating Pin Indicator */}
      <div className="absolute -top-2 -left-2 w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center shadow-lg shadow-gray-700/30 border-2 border-white">
        <MapPin className="h-3 w-3 text-white" />
      </div>
    </div>
  </motion.div>
)

// Demo Container for Single Note
const SingleNoteDemo = () => (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 p-8">
    <div className="max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          NOA Single Note Design
        </h1>
        <p className="text-gray-600">
          Apple-inspired floating note with AI enhancements
        </p>
      </div>
      
      <div className="relative">
        <SingleSleekNote 
          content="The button color doesn't match our brand guidelines. Could we use our primary blue (#2563eb) instead?"
          author="Sarah Chen"
          avatar="SC"
          timestamp="2 min ago"
          tone="professional"
          isAiEnhanced={true}
          delay={0.5}
        />
      </div>
      
      <div className="mt-8 grid grid-cols-3 gap-4 text-center">
        <div className="p-3 bg-white rounded-lg border border-gray-200">
          <Zap className="h-5 w-5 text-gray-700 mx-auto mb-1" />
          <div className="text-xs font-medium text-gray-900">AI-Powered</div>
        </div>
        <div className="p-3 bg-white rounded-lg border border-gray-200">
          <Target className="h-5 w-5 text-gray-700 mx-auto mb-1" />
          <div className="text-xs font-medium text-gray-900">Precise</div>
        </div>
        <div className="p-3 bg-white rounded-lg border border-gray-200">
          <MessageSquare className="h-5 w-5 text-gray-700 mx-auto mb-1" />
          <div className="text-xs font-medium text-gray-900">Interactive</div>
        </div>
      </div>
    </div>
  </div>
)

export default SingleNoteDemo
export { SingleSleekNote } 