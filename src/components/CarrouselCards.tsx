import Carousel from 'react-multi-carousel';
import { responsive } from '../constants';
import 'react-multi-carousel/lib/styles.css';
import { ContextProviderProps } from '../types/types.d';

// COMPONENTE CARROUSEL DE TARJETAS
export function CarrouselCards({ children }: ContextProviderProps) {
    return (
             <Carousel
               responsive={responsive}
               swipeable
               draggable
               showDots
               ssr
               infinite
               keyBoardControl
               containerClass="carousel-container"
               itemClass="carousel-item-padding"
               removeArrowOnDeviceType={['tablet', 'mobile']}
             >
              { children}
             </Carousel>
    );
}