import React from 'react';
import Dropzone from 'react-dropzone-uploader';
import 'react-dropzone-uploader/dist/styles.css';

const SingleFileAutoSubmit = () => {
  const toast = (innerHTML) => {
    const el = document.getElementById('toast');
    el.innerHTML = innerHTML;
    el.className = 'show';
    setTimeout(() => {
      el.className = el.className.replace('show', '');
    }, 3000);
  };

  const getUploadParams = () => {
    return { url: 'http://localhost:8000/api/uploads/tinderlite/' };
  };

  const handleChangeStatus = ({ meta, remove }, status) => {
    if (status === 'headers_received') {
      toast(`${meta.name} uploaded!`);
      remove();
    } else if (status === 'aborted') {
      toast(`${meta.name}, upload failed...`);
    }
  };

  return (
    <React.Fragment>
      <div id="toast"></div>
      <Dropzone
        getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        maxFiles={1}
        multiple={false}
        canCancel={false}
        inputContent="Drop TinderLite File Here"
        styles={{
          dropzone: { width: 400, height: 200 },
          dropzoneActive: { borderColor: 'green' }
        }}
      />
    </React.Fragment>
  );
};

export default SingleFileAutoSubmit;
