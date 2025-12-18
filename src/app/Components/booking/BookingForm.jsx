// BookingForm: Formular til at booke et bord. Indeholder felter for navn, email, bordnummer, gæster, dato, kontakt og kommentar
export default function BookingForm({ formData, errors, handleInputChange, handleSubmit }) {
  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold tracking-[3px] mb-10">BOOK A TABLE</h2>
      {/* Formular til bordbooking */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Navn og email felter */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            {/* Navn */}
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
            {/* Email */}
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

        {/* Bordnummer og antal gæster */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            {/* Bordnummer (readonly) */}
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
            {/* Antal gæster */}
            <input
              type="text"
              name="guests"
              placeholder="Number of Guests"
              value={formData.guests}
              onChange={handleInputChange}
              required
              className={`bg-transparent border ${errors.guests ? 'border-red-500' : 'border-white'} text-white px-5 py-4 outline-none placeholder-white w-full`}
              inputMode="numeric"
              pattern="[0-9]*"
            />
            {errors.guests && <p className="text-red-500 text-sm mt-1">{errors.guests}</p>}
          </div>
        </div>

        {/* Dato og kontakt info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            {/* Dato vælger */}
            <select
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
              className={`bg-transparent border ${errors.date ? 'border-red-500' : 'border-white'} text-white px-5 py-4 outline-none w-full appearance-none`}
              style={{ backgroundImage: 'url("data:image/svg+xml;utf8,<svg fill=\'white\' height=\'24\' viewBox=\'0 0 24 24\' width=\'24\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M7 10l5 5 5-5z\'/></svg>")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center' }}
            >
              <option value="">Select Date</option>
              {/* Viser de næste 14 dage som valgmuligheder */}
              {Array.from({ length: 14 }).map((_, i) => {
                const date = new Date();
                date.setDate(date.getDate() + i);
                const dateString = date.toISOString().split('T')[0];
                return (
                  <option key={dateString} value={dateString}>
                    {dateString}
                  </option>
                );
              })}
            </select>
            {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
          </div>
          <div>
            {/* Kontakt telefonnummer */}
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

        {/* Kommentar felt */}
        <textarea
          name="comment"
          placeholder="Your Comment"
          value={formData.comment}
          onChange={handleInputChange}
          rows="5"
          className="bg-transparent border border-white text-white px-5 py-4 outline-none placeholder-white"
        />

        {/* Send knap */}
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
