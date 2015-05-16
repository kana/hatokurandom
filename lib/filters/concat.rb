class ConcatFilter < Nanoc::Filter
  identifier :concat
  type :text

  def run(content, params={})
    depend_on(params[:items])
    params[:items].map {|i| i.raw_content}.join()
  end
end
