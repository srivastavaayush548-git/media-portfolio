const Padmabhushan = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-200 via-yellow-200 to-orange-100 text-stone-800 font-sans selection:bg-red-100 pt-20">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="inline-block px-3 py-1 bg-red-50 text-red-800 text-xs font-bold uppercase tracking-wider rounded-full mb-4">
          National Honor
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 leading-tight mb-6">
          Padma Bhushan
        </h1>
        <div className="border-l-4 border-red-700 pl-6 mb-10">
          <p className="text-xl text-stone-600 leading-relaxed">
            Conferred the Padma Bhushan in 2025 for his distinguished service in
            the fields of Literature and Education.
          </p>
        </div>
        <div className="w-full bg-black/5 rounded-2xl p-2 md:p-4 backdrop-blur-sm">
          <div className="relative w-full rounded-xl overflow-hidden shadow-lg aspect-video">
            <iframe 
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/sN9A_43-4_0"
              title="A. Surya Prakash Honoured with Padma Bhushan"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <p className="text-center text-sm text-stone-500 mt-3 font-medium italic">
            Video: A. Surya Prakash Honoured with Padma Bhushan
          </p>
        </div>
      </div>
    </div>
  );
};

export default Padmabhushan;
