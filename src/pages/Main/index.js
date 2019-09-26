import React, { Component } from 'react';

import { PDFDocument } from 'pdf-lib';
import SignatureCanvas from 'react-signature-canvas';
import {
  FaPencilAlt,
  FaEraser,
  FaSpinner,
  FaFileSignature,
} from 'react-icons/fa';

import { SignContainer, PdfContainer, SignButton } from './styles';
import Container from '../../components/Container';

export default class Main extends Component {
  state = {
    signing: false,
    pdf: null,
  };

  sigPad = {};

  clear = () => {
    this.sigPad.clear();
  };

  // sleep = ms => {
  //   return new Promise(resolve => setTimeout(resolve, ms));
  // };

  trim = async () => {
    const { pdf } = this.state;

    this.setState({ signing: true });

    const trimmedDataURL = this.sigPad
      .getTrimmedCanvas()
      .toDataURL('image/png');

    if (pdf) {
      const pdfDoc = await PDFDocument.load(pdf);

      const pngImage = await pdfDoc.embedPng(trimmedDataURL);
      const pngDims = pngImage.scale(0.17);

      const pages = pdfDoc.getPages();

      pages.forEach(page => {
        page.drawImage(pngImage, {
          x: 120,
          y: 59,
          width: pngDims.width,
          height: pngDims.height,
        });
      });

      const pdfBytes = await pdfDoc.saveAsBase64({ dataUri: true });

      // await this.sleep(300);
      this.setState({ pdf: pdfBytes, signing: false });
    } else {
      this.setState({ signing: false });
    }
  };

  handleChange = e => {
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({ pdf: reader.result });
    };

    reader.readAsDataURL(file);
  };

  render() {
    const { signing, pdf } = this.state;

    return (
      <Container>
        <h1>
          <FaFileSignature />
          PDF Signaturer
          <input type="file" onChange={this.handleChange} />
        </h1>

        <PdfContainer>
          <iframe title="pdframe" src={pdf} />
        </PdfContainer>

        <SignContainer>
          <SignatureCanvas
            penColor="black"
            ref={ref => {
              this.sigPad = ref;
            }}
          />
          <div>
            <button type="button" onClick={this.clear} disabled={signing}>
              <FaEraser color="#fff" size={14} />
            </button>
            <SignButton onClick={this.trim} loading={signing}>
              {signing ? (
                <FaSpinner color="#fff" size={14} />
              ) : (
                <FaPencilAlt color="#fff" size={14} />
              )}
            </SignButton>
          </div>
        </SignContainer>
      </Container>
    );
  }
}
