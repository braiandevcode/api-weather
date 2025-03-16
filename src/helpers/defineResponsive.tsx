import { ConfigItem, Responsive } from '../types/types.d';

export const generateResponsiveConfig = (config: ConfigItem[]): Responsive => {
    return config.reduce((acc, { name, breakpoint, items, slidesToSlide }) => {
        acc[name] = { breakpoint, items, slidesToSlide };
        return acc;
    }, {} as Responsive);
};