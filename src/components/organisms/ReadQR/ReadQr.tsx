import React from 'react';
import styled from 'styled-components';
import QrReader from 'react-qr-reader';
import { findByLabelText } from '@testing-library/react';

interface Props {
  toggleScanning: Function;
  getScannedItemId: Function;
  handleErr: Function;
}

const ReadQr = (props: Props) => {
  const { toggleScanning, getScannedItemId, handleErr } = props;

  const handleScan = (result: string) => {
    if (result) {
      getScannedItemId(result);
      toggleScanning();
    }
  };

  const previewStyle = {
    height: `98%`,
    width: `98%`,
    position: 'absolute',
    left: '0',
    top: '0',
  };

  return <QrReader delay={200} onError={handleErr} onScan={handleScan} style={previewStyle} />;
};

export default ReadQr;
