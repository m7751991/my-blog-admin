import React, { useEffect, useState } from "react";
import { Drawer, Input, Button, Form, Select, Switch, DatePicker, Upload } from "antd";
import dayjs from "dayjs";
import { BlogModelType, CategoryModelType } from "../../type";

import { fetchData } from "../../fetch";
const { TextArea } = Input;

interface BlogSettingsModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (settings: Omit<BlogModelType, "title" | "content">, id: number | undefined) => void;
  defaultValues: BlogModelType | null;
}

const BlogSettingsModal: React.FC<BlogSettingsModalProps> = React.memo(({ visible, onClose, onSave, defaultValues }) => {
  const [form] = Form.useForm();
  const [categoryList, setCategoryList] = useState<CategoryModelType[]>([]);

  useEffect(() => {
    fetchCategoryList();
    if (defaultValues) {
      form.setFieldsValue({
        ...defaultValues,
      });
    } else {
      form.setFieldsValue({
        createdAt: dayjs().toDate().getTime(),
        accessMode: "public",
        allowReprint: true,
        isPublic: true,
        isPinned: true,
        immediatePublish: true,
        allowComments: true,
        categoryName: "",
      });
    }
  }, [form, defaultValues]);

  const fetchCategoryList = async () => {
    const result = await fetchData<CategoryModelType[], undefined>("/category");
    setCategoryList(result.data || []);
  };

  const handleSave = async (isSave: boolean = false) => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue() as Omit<BlogModelType, "title" | "content">;
      console.log(values, "values");
      values.categoryName = categoryList.find((item) => item.id === values.categoryId)?.name || "";
      values.status = isSave ? 0 : 1;
      console.log(values, "values");
      onSave(values, defaultValues?.id);
    } catch (error) {
      console.log(error, "error");
    }
    onClose();
  };

  const formItems = [
    {
      label: "摘要",
      name: "summary",
      component: <TextArea rows={4} placeholder="请输入摘要,默认取正文前100字" />,
    },
    {
      label: "SEO关键词",
      name: "seoKeywords",
      component: <Input />,
      required: true,
      rules: [{ required: true, message: "请输入SEO关键词!" }],
    },
    {
      label: "SEO描述",
      name: "seoDescription",
      component: <TextArea rows={4} />,
      required: true,
      rules: [{ required: true, message: "请输入SEO描述!" }],
    },
    {
      label: "分类",
      name: "categoryId",
      component: (
        <Select placeholder="选择分类" style={{ width: 240 }}>
          {categoryList.map((item) => (
            <Select.Option key={item.id} value={item.id}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      ),
      required: true,
      rules: [{ required: true, message: "请选择分类!" }],
    },
    {
      label: "标签",
      name: "tags",
      component: (
        <Select placeholder="选择标签" style={{ width: 240 }}>
          <Select.Option value="1">技术</Select.Option>
          <Select.Option value="2">生活方式</Select.Option>
          <Select.Option value="3">旅行</Select.Option>
        </Select>
      ),
    },
    {
      label: "封面",
      name: "coverImage",
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
      name: "createdAt",
      component: <DatePicker format="YYYY-MM-DD HH:mm:ss" style={{ width: 240 }} showTime showNow />,
      getValueFromEvent: (...[, dateString]: any) => {
        console.log(dateString, "dateString");
        return dayjs(dateString).toDate().getTime();
      },
      getValueProps: (value: any) => {
        return { value: value ? dayjs(value) : undefined };
      },
      rules: [{ required: true, message: "请选择发布时间!" }],
      require: true,
    },
    {
      label: "是否允许转载",
      name: "allowReprint",
      component: <Switch />,
      valuePropName: "checked",
    },
    {
      label: "是否公开",
      name: "isPublic",
      component: <Switch />,
      valuePropName: "checked",
    },
    {
      label: "是否置顶",
      name: "isPinned",
      component: <Switch />,
      valuePropName: "checked",
    },
    {
      label: "是否允许评论",
      name: "allowComments",
      component: <Switch />,
      valuePropName: "checked",
    },
  ];

  return (
    <Drawer width="50%" title="设置" placement="right" open={visible} onClose={onClose}>
      <Form form={form} layout="vertical" className="pb-32">
        {formItems.map((item, index) => (
          <Form.Item
            key={index}
            label={item.label}
            name={item.name}
            required={item.required}
            rules={item.rules}
            valuePropName={item.valuePropName}
            getValueFromEvent={item.getValueFromEvent}
            getValueProps={item.getValueProps}
          >
            {item.component}
          </Form.Item>
        ))}
        <Form.Item className="flex justify-end absolute bottom-0 right-25 left-0">
          <Button type="primary" htmlType="submit" size="large" style={{ width: "100px", marginRight: "8px" }} onClick={() => handleSave(false)}>
            发布
          </Button>
          <Button type="default" size="large" style={{ width: "100px" }} onClick={() => handleSave(true)}>
            保存
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
});

export default BlogSettingsModal;
