import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify"; // 导入 DOMPurify
import styled from "styled-components";
import { Input, Button } from "antd";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";

import BlogSettingsModal from "../components/BlogSettingsModal";
import { createResource, fetchData, updateResource } from "../fetch";
import { BlogModelType } from "../type";

const mdParser = new MarkdownIt({ html: false, linkify: false, typographer: true });
const StyledMdEditor = styled(MdEditor)`
  height: calc(100vh - 90px);
`;

const CreateBlog: React.FC = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [visible, setVisible] = useState(false);
  const [blogData, setBlogData] = useState<BlogModelType | null>(null);
  const { id } = useParams();

  const fetchBlogData = useCallback(async () => {
    const { data } = await fetchData<BlogModelType, undefined>(`/blogs/${id}`);
    if (data) {
      setBlogData(data);
      setContent(data?.content);
      setTitle(data?.title);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchBlogData();
    }
  }, [id, fetchBlogData]);

  const handleEditorChange = ({ text }: { text: string }) => {
    setContent(text);
  };

  const renderHTML = (text: string) => {
    const dirty = mdParser.render(text); // 解析成 HTML
    return DOMPurify.sanitize(dirty); // 使用 DOMPurify 清理 HTML防止XSS攻击
  };

  const handlerSubmit = useCallback(
    async (params: Omit<BlogModelType, "title" | "content">, id: number | undefined) => {
      const blog: BlogModelType = {
        ...params,
        title,
        content: content,
      };
      const url = id ? `/blogs/${id}` : "/blogs";
      const api = id ? updateResource : createResource;
      const { code, data, error } = await api(url, blog);
      if (code === 200) {
        setVisible(false);
      }
    },
    [content, title]
  );

  const openSetting = async () => {
    setVisible(true);
  };
  const onClose = useCallback(() => {
    setVisible(false);
  }, []);
  return (
    <div>
      <div className="flex justify-between items-center bg-white px-32">
        <Input className="text-3xl w-[40%] h-66 border-none shadow-none " maxLength={60} placeholder="请输入标题" value={title} onChange={(e) => setTitle(e.target.value)} />
        <div className="flex items-center">
          <div className="text-sm text-gray-400 mr-8">保存成功</div>
          <Button type="primary" size="large" className="ml-8" onClick={openSetting}>
            发布设置
          </Button>
        </div>
      </div>
      <BlogSettingsModal defaultValues={blogData} visible={visible} onClose={onClose} onSave={handlerSubmit} />
      <StyledMdEditor renderHTML={renderHTML} onChange={handleEditorChange} value={content} />
      <div className="flex w-full px-8 text-sm text-gray-500 bg-white border-t border-gray-200">
        <p className="mr-8">字符数: {content.length}</p>
        <p className="mr-8">行数: {content.split("\n").length}</p>
        <p className="mr-8">正文字数: {content.match(/[\u4e00-\u9fa5]+|[a-zA-Z]+/g)?.length || 0}</p>
      </div>
    </div>
  );
};

export default CreateBlog;
