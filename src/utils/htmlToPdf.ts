import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface PDFOptions {
  orientation?: 'p' | 'l';
  margins?: number;
  scale?: number;
}

export async function generatePDF(title: string, selector: string, options: PDFOptions = {}): Promise<void> {
  try {
    const target = document.querySelector(selector) as HTMLElement;
    if (!target) throw new Error('Target element not found');

    // 动态计算DPI和缩放比例[3,5](@ref)
    const scale = options.scale || window.devicePixelRatio * 2;
    const canvas = await html2canvas(target, {
      scale,
      useCORS: true,
      logging: false,
      backgroundColor: '#FFFFFF',
      dpi: 300, // 固定打印级DPI[6](@ref)
    });

    const pdf = new jsPDF(options.orientation || 'p', 'pt', 'a4');
    const pageWidth = 595.28; // A4宽度(单位:pt)
    const pageHeight = 841.89; // A4高度

    // 计算内容宽高比例
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * pageWidth) / canvas.width;

    // 分页参数初始化
    let renderedHeight = 0;
    const pageCount = Math.ceil(canvas.height / (canvas.width * (pageHeight / pageWidth)));

    // 批量处理分页[8](@ref)
    for (let i = 0; i < pageCount; i++) {
      if (i > 0) pdf.addPage();

      // 计算当前页显示高度
      const currentHeight = Math.min(canvas.height - renderedHeight, (pageHeight * canvas.width) / pageWidth);

      // 通过画布分割实现分页[7](@ref)
      const pageCanvas = document.createElement('canvas');
      pageCanvas.width = canvas.width;
      pageCanvas.height = currentHeight;

      const ctx = pageCanvas.getContext('2d');
      ctx?.drawImage(canvas, 0, renderedHeight, canvas.width, currentHeight, 0, 0, canvas.width, currentHeight);

      // 添加图像到PDF[1](@ref)
      pdf.addImage(
        pageCanvas.toDataURL('image/jpeg', 1.0),
        'JPEG',
        options.margins || 0,
        options.margins || 0,
        imgWidth,
        (imgWidth / pageCanvas.width) * pageCanvas.height,
        undefined,
        'FAST', // 启用快速渲染模式
      );

      renderedHeight += currentHeight;
    }

    pdf.save(`${title}.pdf`);
  } catch (error) {
    console.error('PDF生成失败:', error);
    throw new Error(`PDF生成失败: ${error.message}`);
  }
}
