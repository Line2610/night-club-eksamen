export default function BookingForm({ formData, errors, handleInputChange, handleSubmit }) {
  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold tracking-[3px] mb-10">BOOK A TABLE</h2>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className={`bg-transparent border ${errors.name ? 'border-red-500' : 'border-white'} text-white px-5 py-4 outline-none placeholder-white w-full`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className={`bg-transparent border ${errors.email ? 'border-red-500' : 'border-white'} text-white px-5 py-4 outline-none placeholder-white w-full`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <input
              type="text"
              name="tableNumber"
              placeholder="Table Number"
              value={formData.tableNumber}
              onChange={handleInputChange}
              required
              readOnly
              className={`bg-transparent border ${errors.tableNumber ? 'border-red-500' : 'border-white'} text-white px-5 py-4 outline-none placeholder-white w-full cursor-not-allowed`}
            />
            {errors.tableNumber && <p className="text-red-500 text-sm mt-1">{errors.tableNumber}</p>}
          </div>
          <div>
            <input
              type="number"
              name="guests"
              placeholder="Number of Guests"
              value={formData.guests}
              onChange={handleInputChange}
              min="1"
              max="20"
              required
              className={`bg-transparent border ${errors.guests ? 'border-red-500' : 'border-white'} text-white px-5 py-4 outline-none placeholder-white w-full`}
            />
            {errors.guests && <p className="text-red-500 text-sm mt-1">{errors.guests}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              min={new Date().toISOString().split('T')[0]}
              required
              className={`bg-transparent border ${errors.date ? 'border-red-500' : 'border-white'} text-white px-5 py-4 outline-none w-full`}
            />
            {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
          </div>
          <div>
            <input
              type="tel"
              name="contact"
              placeholder="Your Contact Number"
              value={formData.contact}
              onChange={handleInputChange}
              required
              className={`bg-transparent border ${errors.contact ? 'border-red-500' : 'border-white'} text-white px-5 py-4 outline-none placeholder-white w-full`}
            />
            {errors.contact && <p className="text-red-500 text-sm mt-1">{errors.contact}</p>}
          </div>
        </div>

        <textarea
          name="comment"
          placeholder="Your Comment"
          value={formData.comment}
          onChange={handleInputChange}
          rows="5"
          className="bg-transparent border border-white text-white px-5 py-4 outline-none placeholder-white"
        />

        <button
          type="submit"
          className="border-b border-t border-white px-6 py-2 self-end transition-all"
        >
          RESERVE
        </button>
      </form>
    </div>
  );
}
