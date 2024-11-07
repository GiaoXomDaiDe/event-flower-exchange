import { PlusOutlined } from '@ant-design/icons'
import { Upload } from 'antd'
import ImgCrop from 'antd-img-crop'
import PropTypes from 'prop-types'
import { useState } from 'react'

const ImageUploader = ({ value = [], onChange }) => {
  const [fileList, setFileList] = useState(value)

  const handleChange = (info) => {
    let newFileList = [...info.fileList]
    console.log(info)
    setFileList(newFileList)
  }

  return (
    <ImgCrop rotationSlider>
      <Upload
        accept='image/*'
        listType='picture-card'
        beforeUpload={() => false}
        // multiple
        maxCount={5}
        fileList={fileList}
        onChange={handleChange}
      >
        {fileList.length >= 5 ? null : (
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        )}
      </Upload>
    </ImgCrop>
  )
}
export default ImageUploader
ImageUploader.propTypes = {
  value: PropTypes.array,
  onChange: PropTypes.func
}
