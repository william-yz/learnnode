(defn rev [old & newl]
  (print newl)
  (if (empty? old) newl
  (rev (butlast old) (conj (if (nil? newl) [] (newl 0)) (last old))))
  )

(println (rev [1 2 3]))