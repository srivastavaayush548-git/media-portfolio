import React from 'react'

const RajyotsavaAward = () => {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans selection:bg-red-100 pt-20">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="inline-block px-3 py-1 bg-red-50 text-red-800 text-xs font-bold uppercase tracking-wider rounded-full mb-4">
          State Honor
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 leading-tight mb-6">
          Rajyotsava Award
        </h1>
        <div className="border-l-4 border-red-700 pl-6">
          <p className="text-xl text-stone-600 leading-relaxed">
            Honored with the Rajyotsava Award in 2010 by the Government of Karnataka.
          </p>
        </div>
      </div>
    </div>
  )
}

export default RajyotsavaAward