import React from "react";
import { Drawer, Input, Button, Form, Select, Switch, DatePicker, Upload } from "antd";
const { TextArea } = Input;

interface BlogSettingsModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (settings: { title: string; description: string }) => void;
}

const BlogSettingsModal: React.FC<BlogSettingsModalProps> = ({ visible, onClose, onSave }) => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [form] = Form.useForm();

  const handleSave = () => {
    onSave({ title, description });
    onClose();
  };

  const formItems = [
    {
      label: "摘要",
      name: "summary",
      component: <TextArea rows={4} value={description} placeholder="请输入摘要,默认取正文前100字" onChange={(e) => setDescription(e.target.value)} />,
    },
    {
      label: "SEO关键词",
      name: "seoKeywords",
      component: <Input />,
      required: true,
    },
    {
      label: "SEO描述",
      name: "seoDescription",
      component: <TextArea rows={4} value={description} onChange={(e) => setDescription(e.target.value)} />,
      required: true,
    },
    {
      label: "分类",
      name: "category",
      component: (
        <Select placeholder="选择分类" onChange={(value) => setTitle(value)} style={{ width: 240 }}>
          <Select.Option value="tech">技术</Select.Option>
          <Select.Option value="lifestyle">生活方式</Select.Option>
          <Select.Option value="travel">旅行</Select.Option>
        </Select>
      ),
      required: true,
    },
    {
      label: "标签",
      name: "tags",
      component: (
        <Select placeholder="选择标签" onChange={(value) => setTitle(value)} style={{ width: 240 }}>
          <Select.Option value="tech">技术</Select.Option>
          <Select.Option value="lifestyle">生活方式</Select.Option>
          <Select.Option value="travel">旅行</Select.Option>
        </Select>
      ),
    },
    {
      label: "封面",
      name: "cover",
      component: (
        <Upload
          accept="image/*"
          showUploadList={false}
          beforeUpload={() => false} // Prevent automatic upload
        >
          <Button>上传封面图片</Button>
        </Upload>
      ),
    },
    {
      label: "发布时间",
      name: "publishTime",
      component: <DatePicker style={{ width: 240 }} />,
      required: true,
    },
    {
      label: "访问模式",
      name: "accessMode",
      component: (
        <Select placeholder="选择访问模式" onChange={(value) => setTitle(value)} style={{ width: 240 }}>
          <Select.Option value="public">公开</Select.Option>
          <Select.Option value="private">私密</Select.Option>
        </Select>
      ),
      required: true,
    },
    {
      label: "是否允许转载",
      name: "allowReprint",
      component: <Switch />,
      required: true,
      valuePropName: "checked",
    },
    {
      label: "是否公开",
      name: "isPublic",
      component: <Switch />,
      required: true,
      valuePropName: "checked",
    },
    {
      label: "是否置顶",
      name: "isPinned",
      component: <Switch />,
      required: true,
      valuePropName: "checked",
    },
    {
      label: "立即发布",
      name: "immediatePublish",
      component: <Switch />,
      required: true,
      valuePropName: "checked",
    },
    {
      label: "是否允许评论",
      name: "allowComments",
      component: <Switch />,
      required: true,
      valuePropName: "checked",
    },
  ];

  return (
    <Drawer width="50%" title="设置" placement="right" open={visible} onClose={onClose}>
      <Form form={form} layout="vertical" className="pb-32">
        {formItems.map((item, index) => (
          <Form.Item key={index} label={item.label} name={item.name} required={item.required} valuePropName={item.valuePropName}>
            {item.component}
          </Form.Item>
        ))}
        <Form.Item className="flex justify-end absolute bottom-0 right-25 left-0">
          <Button type="primary" htmlType="submit" size="large" style={{ width: "100px", marginRight: "8px" }}>
            发布
          </Button>
          <Button type="default" size="large" style={{ width: "100px" }} onClick={onClose}>
            保存
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default BlogSettingsModal;
