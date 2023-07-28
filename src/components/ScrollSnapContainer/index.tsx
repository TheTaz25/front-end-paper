import { forwardRef } from 'react';
import cls from '../../utils/classGen';
import './styles.scss';

type Props = {
  direction?: 'x' | 'y' | 'both',
  snapType?: 'mandatory' | 'proximity',
} & React.HTMLAttributes<HTMLDivElement>

const ScrollSnapContainer = forwardRef<HTMLDivElement, React.PropsWithChildren<Props>>(({
  children,
  direction = 'y',
  snapType = 'proximity',
  className,
  ...props
}, ref) => {
  return (
    <div className={cls({
      'scroll-snap-container': true,
      'x-man': direction === 'x' && snapType === 'mandatory',
      'y-man': direction === 'y' && snapType === 'mandatory',
      'both-man': direction === 'both' && snapType === 'mandatory',
      'x-prox': direction === 'x' && snapType === 'proximity',
      'y-prox': direction === 'y' && snapType === 'proximity',
      'both-prox': direction === 'both' && snapType === 'proximity',
    }, className)}
    ref={ref}
    {...props}>
      {children}
    </div>
  );
})
export default ScrollSnapContainer;
