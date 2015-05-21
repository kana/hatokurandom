class ConcatFilter < Nanoc::Filter
  identifier :concat
  type :text

  def run(content, params={})
    depend_on(params[:items])
    params[:items]
      .map {|i|
        if i.binary?
          File.open(i.raw_filename).read()
        else
          i.compiled_content
        end
      }
      .join()
  end
end
