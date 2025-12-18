import Image from 'next/image';

// Hero2 komponent - bruges til undersider med simpel hero sektion
const Hero2 = ({title}) => {
    return ( 
        // Relativ container for at positionere indhold over baggrundsbillede
        <div className='relative'>
            {/* Baggrundsbillede med reduceret opacity for at skabe overlay effekt */}
            <Image
                src="/assets/bg/footerbg.jpg"
                width={1920}
                height={600}
                className='w-full h-60 object-cover opacity-20'
                alt="Hero background"
            />
            
            {/* Absolut positioneret indhold overlay - centreret både horisontalt og vertikalt */}
            <div className='absolute inset-0 flex flex-col items-center justify-center'>
                {/* Hoved titel - modtaget som prop fra parent komponent */}
                <h1 className="text-white text-3xl uppercase text-center mb-2">{title}</h1>
                
                {/* Dekorativ bundlinje under titlen */}
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