import Image from 'next/image';

export default function TableGrid({ selectedTable, handleTableClick, isTableBookedOnDate, formData }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-16">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((tableNum) => {
        const isSelected = selectedTable === tableNum;
        const isBooked = formData.date ? isTableBookedOnDate(tableNum, formData.date) : false;
        
        let tableImage;
        if ([1, 2, 4, 9, 6, 7, 11, 12, 14].includes(tableNum)) {
          tableImage = 'table_1.png';
        } else if ([3, 8, 13].includes(tableNum)) {
          tableImage = 'table_2.png';
        } else {
          tableImage = 'table_3.png';
        }
        
        return (
          <div
            key={tableNum}
            className={`relative aspect-square transition-all ${
              isBooked 
                ? 'opacity-50 cursor-not-allowed'
                : ''
            }`}
            onClick={() => handleTableClick(tableNum)}
          >
            {isSelected && !isBooked && (
              <div className="absolute inset-[-5px] border-2 border-[#FF2A70] z-10"></div>
            )}
            
            <div className="relative w-full h-full max-w-[300px] mx-auto">
              <Image 
                src={`/assets/table/${tableImage}`}
                alt={`Table ${tableNum}`}
                fill
                className={`object-contain ${isBooked ? 'grayscale' : ''}`}
              />
              <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-white">
                {tableNum}
              </div>
              {isBooked && (
                <div className="absolute inset-0 flex items-center justify-center">

                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
