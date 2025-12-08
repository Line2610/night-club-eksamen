import Image from 'next/image';

const Hero2 = ({title}) => {
    return ( 
          <div className='relative'>
            <Image
                src="/assets/bg/footerbg.jpg"
                width={1920}
                height={600}
                className='w-full h-60 object-cover opacity-20'
                alt="Hero background"
            />
            <div className='absolute inset-0 flex flex-col items-center justify-center'>
                <h1 className="text-white text-3xl uppercase text-center mb-2">{title}</h1>
                <Image
                    src="/assets/bottom_line2.png"
                    width={150}
                    height={100}
                    className='block'
                    alt="Decorative line"
                />
            </div>
        </div>
     );
}
 
export default Hero2;