import { forwardRef } from 'react';
import cls from '../../utils/classGen';
import './styles.scss';

type Props = {
  align?: 'start' | 'center' | 'end',
  stopAlways?: boolean
} & React.HTMLAttributes<HTMLDivElement>

const ScrollSnapElement = forwardRef<HTMLDivElement, React.PropsWithChildren<Props>>(({
  children,
  align = 'start',
  stopAlways = false,
  className,
  ...props
}, ref) => {
  return (
    <div className={cls({
      'scroll-snap-element': true,
      'align-start': align === 'start',
      'align-center': align === 'center',
      'align-end': align === 'end',
      'stop-always': stopAlways,
    }, className)} {...props} ref={ref}>
      {children}
    </div>
  );
});

export default ScrollSnapElement;
