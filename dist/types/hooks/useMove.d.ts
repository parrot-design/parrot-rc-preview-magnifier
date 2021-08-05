/**
 * 一个hook可以计算此时的position
 * @param wrapperRect 需要放大的图片
 * @param selectedRect 选中的盒子
 * @returns
 */
export default function useMove(wrapperRect: any, selectedRect: any): {
    start: (event: any) => void;
    move: (event: any) => void;
    reset: () => void;
    startX: number;
    startY: number;
    position: any;
};
