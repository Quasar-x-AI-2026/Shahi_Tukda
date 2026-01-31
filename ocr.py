from doctr.io import DocumentFile
from doctr.models import ocr_predictor

ocr_model = ocr_predictor(
    det_arch="db_resnet50",
    reco_arch="crnn_vgg16_bn",
    pretrained=True
)

def extract_text(file_path: str) -> str:
    doc = DocumentFile.from_pdf(file_path)
    result = ocr_model(doc)

    lines = []

    for page in result.pages:
        for block in page.blocks:
            for line in block.lines:
                text = " ".join(word.value for word in line.words)
                lines.append(text)

    return "\n".join(lines)
