class VersionFilter < Nanoc::Filter
  identifier :version
  type :text

  def run(content, params={})
    content.gsub(/@@VERSION@@/, %x{git describe --always --dirty})
  end
end
