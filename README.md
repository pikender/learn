learn
=====

Raw thoughts

Graphviz is an aweosme tool used to generate diagrams

Best is its declrative style to draw graphs using DOT format

To enter the familiar domain, rails-erd is a tool on top of ruby wrapper
of graphviz (ruby-graphviz)

state_machine gives you a rake task to publish state machine image using
graphviz `rake state_machine:draw FILE=vehicle.rb CLASS=Vehicle`

just came across a beautiful use of showing gem dependencies using
bundler `bundle viz`

`RAILS_ENV=production ruby bin/single_model.rb`

```ruby
require File.dirname(File.expand_path(File.dirname(__FILE__))) +
"/config/environment"

multi_model = true
file_name = "activerecord_associations.png"

all_models = ActiveRecord::Base.descendants

single_model = ENV['Class']
if single_model
  model_exists = all_models.any? {|k| k.to_s == single_model}
  if model_exists
    p "#{single_model} is Present"
  else
    p "Model Absent or Not ActiveRecord::Base subclass"
    exit(1)
  end
  multi_model = false
  file_name = "#{single_model}-activerecord_associations.png"
end

graph_viz = GraphViz::new('Gemfile', {:concentrate => true, :normalize
=> true, :nodesep => 0.55})
graph_viz.edge[:fontname] = graph_viz.node[:fontname] = 'ArialMT,
Helvetica, SansSerif'
graph_viz.edge[:fontsize] = 12

models = {}

all_models.each do |model|
  model_name = model.to_s
  model.reflect_on_all_associations.each do |assoc|
    assoc_name = assoc.name.to_s.singularize.camelize
    if multi_model || ((model_name == single_model) || (assoc_name ==
single_model))
      models[model_name] ||= graph_viz.add_node(model_name, { :shape =>
'box3d',
                                            :fontsize => 16,
                                            :style => 'filled',
                                            :fillcolor => '#B9B9D5' } )
      models[assoc_name] ||= graph_viz.add_node(assoc_name, { :shape =>
'box3d',
                                            :fontsize => 16,
                                            :style => 'filled',
                                            :fillcolor => '#B9B9D5' } )
      graph_viz.add_edge(models[model_name],
                         models[assoc_name],
                         { :weight => 2 }
                        ) unless models[assoc_name].nil?
    end
  end
end

graph_viz.output( :png => file_name )
```
